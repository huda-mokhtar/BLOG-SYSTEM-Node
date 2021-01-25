const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 140
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    maxLength: 140,
    required: true
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  followings: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}, {
  toJSON: {
    transform: (doc, ret, options) => {
      delete ret.password;
      return ret;
    },
  },
});


userSchema.pre('save', function preSave(next) {
  if (this.password)//*** */
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

userSchema.pre('findByIdAndUpdate', function (next) { ///*** */
  if (this._update.password)
      this._update.password = bcrypt.hashSync(this._update.password, 8)
  next()
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel; 