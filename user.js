const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = New Schema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    match: /^[a-zA-Z0-9_.-]+$/,
    unique: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 255,
    match: /^\S+@\S+\.\S+$/ // basic email pattern
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Remove sensitive fields when converting to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

// Helper to set password (hashing)
UserSchema.methods.setPassword = async function (plainPassword) {
  const saltRounds = 12;
  this.passwordHash = await bcrypt.hash(plainPassword, saltRounds);
};

// Helper to compare passwords
UserSchema.methods.verifyPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);