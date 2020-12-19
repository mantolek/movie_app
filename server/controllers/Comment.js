const Comment = require('../models/Comment');

/**
 * Save comment
 * POST
 */
exports.saveComment = async (req, res) => {
  let variable = {};
  variable = {
    author: req.user._id,
    content: req.body.content,
    postID: req.body.postID,
  };

  try {
    // Create comment
    const comment = await new Comment(variable);
    if (!comment)
      return res
        .status(400)
        .json({ msg: 'Something went wrong with comment.' });

    // Save comment
    const newComment = await comment.save();
    if (!newComment)
      res.status(400).json({ msg: 'Something went wrong with comment.' });

    const populated = await Comment.find({ _id: comment._id }).populate(
      'author'
    );

    return res.status(200).json({ success: true, result: populated });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Get comment
 * POST
 */
exports.getComments = async (req, res) => {
  const { movieID } = req.body;

  try {
    const comments = await Comment.find({ postID: movieID });
    if (!comments)
      return res
        .status(400)
        .json({ msg: 'Something went wrong with favorite.' });

    const populated = await Comment.find({ postID: movieID }).populate(
      'author'
    );

    console.log(comments)

    return res.status(200).json({ success: true, comments: populated });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
