const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = mongoose.Schema({
  userID : {
    type : Schema.Types.ObjectId,
    ref : 'User',
  },
  movieID : {
    type : String,
  },
  movieTitle : {
    type : String,
  },
  moviePoster : {
    type : String,
  },
  movieRunTime : {
    type : String,
  },
}, { timestamps : true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
