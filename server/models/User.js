const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
  name : {
    type : String,
    trim : true,
    maxlength : 50,
  },
  email : {
    type : String,
    trim : true,
    unique : 1,
  },
  password : {
    type : String,
    minglength : 5,
  },
  lastname : {
    type : String,
    trim : true,
    maxlength : 50,
  },
  role : {
    type : Number,
    default : 0,
  },
  token : {
    type : String,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;

//   // If password changes
//   if (user.isModified('password')) {
//     // Hash password
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       if (err) return next(err);

//       return bcrypt.hash(user.password, salt, (hashErr, hash) => {
//         if (hashErr) return next(hashErr);
//         user.password = hash;
//         return next();
//       });
//     });
//   } else {
//     next();
//   }

  if (user.isModified('password')) {
    const salt = await bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  } else {
    next()
  }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);

  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByToken = function (token) {
  const user = this;

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) throw Error({ msg : 'ERROR' });

  return user.findOne({ _id : decode, token });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
