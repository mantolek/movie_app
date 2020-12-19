const Favorite = require('../models/Favorite');

/**
 * GET NUMBER OF PEOPLE SUBSCRIBED TO THE MOVIE
 * POST
 */
// exports.favoriteNumber = async (req, res) => {
//   try {
//     const favorite = await Favorite.find({ movieID: req.body.movieID });
//     if (!favorite)
//       return res
//         .status(400)
//         .json({ msg: 'Something went wrong with favorite.' });

//     return res
//       .status(200)
//       .json({ success: true, subscribeNumber: favorite.length });
//   } catch (err) {
//     return res.status(400).json({ msg: err.message });
//   }
// };

/**
 * Check if movie is user favorited
 * POST
 */
exports.favorited = async (req, res) => {
  try {
    const favorite = await Favorite.find({
      movieID: req.body.movieID,
      userID: req.user._id,
    });
    if (!favorite)
      return res
        .status(400)
        .json({ msg: 'Something went wrong with favorite.' });

    if (favorite.length !== 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Add a favorite movie
 * POST
 */
exports.addToFavorite = async (req, res) => {
  try {
    const favorite = await new Favorite({
      movieID: req.body.movieID,
      userID: req.user._id,
      movieTitle: req.body.movieTitle,
      moviePoster: req.body.moviePoster,
      movieRunTime: req.body.movieRunTime,
    });

    const newFavorite = await favorite.save();
    if (!newFavorite)
      res.status(400).json({ msg: 'Something went wrong with favorite.' });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Remove a favorite movie
 * POST
 */
exports.removeFromFavorite = async (req, res) => {
  try {
    const removeFavorite = await Favorite.findOneAndDelete({
      movieID: req.body.movieID,
      userID: req.user._id,
    });

    if (!removeFavorite)
      return res
        .status(400)
        .json({ err: 'Something went wrong with favorite.' });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Get favorite movies
 * POST
 */
exports.getFavoredMovie = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userID: req.user._id });

    if (!favorites)
      return res
        .status(400)
        .json({ err: 'Something went wrong with favorite.' });

    return res.status(200).json({ success: true, favorites });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
