const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = mongoose.Schema({
  author : {
    type : Schema.Types.ObjectId,
    ref : 'User',
  },
  postID : {
    type : String,
  },
  content : {
    type : String,
  },

}, { timestamps : true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
