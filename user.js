const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    match: /^[a-zA-Z0-9_.-]+$/,
    unique: true,
    sparse: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 60, // bcrypt hash is always 60 chars
    maxlength: 1024
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 255,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    unique: true,
    sparse: true,
    index: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Prevent direct passwordHash modification
UserSchema.pre('save', function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  // If passwordHash was manually set (not through setPassword), reject it
  if (this.passwordHash && this.passwordHash.length !== 60) {
    return next(new Error('Password must be set using setPassword method'));
  }
  next();
});

// Remove sensitive fields when converting to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

// Helper to set password (hashing)
UserSchema.methods.setPassword = async function (plainPassword) {
  // Validate password strength
  if (!plainPassword || plainPassword.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  const saltRounds = 12;
  this.passwordHash = await bcrypt.hash(plainPassword, saltRounds);
};

// Helper to compare passwords
UserSchema.methods.verifyPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
