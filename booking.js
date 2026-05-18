const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingStatus = ['pending', 'confirmed', 'cancelled', 'completed'];

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  status: {
    type: String,
    enum: BookingStatus,
    default: 'pending'
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Add indexes for better query performance
BookingSchema.index({ user: 1 });
BookingSchema.index({ event: 1 });
BookingSchema.index({ status: 1 });

// Add schema methods for common operations
BookingSchema.methods.canCancel = function() {
  return this.status === 'pending' || this.status === 'confirmed';
};

BookingSchema.methods.isCompleted = function() {
  return this.status === 'completed';
};

module.exports = mongoose.model('Booking', BookingSchema);
