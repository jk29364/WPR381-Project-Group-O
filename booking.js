const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingStatus = ['pending', 'confirmed', 'cancelled', 'completed'];

const BookingSchema = New Schema = new Schema({
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

// NOTE: capacity enforcement and preventing overbooking should be implemented
// in the booking service/controller with document-level checks or transactions.
// Keep model lightweight; do not perform cross-collection updates here.

module.exports = mongoose.model('Booking', BookingSchema);