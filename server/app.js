const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cors());
app.use(express.json({ limit : '50MB' }));
app.use(cookieParser());

// Connect routes
const User = require('./routes/user');
const Comment = require('./routes/comment');
const Like = require('./routes/Like');
const Favorite = require('./routes/Favorite');

app.use('/user', User);
app.use('/comment', Comment);
app.use('/like', Like);
app.use('/favorite', Favorite);

module.exports = app;
