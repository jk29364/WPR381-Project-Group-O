const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = New Schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    trim: true
  },
  description: {
    type: String,
    maxlength: 2000,
    trim: true
  },
  location: {
    type: String,
    maxlength: 500,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        // endDate must be after startDate
        if (!this.startDate || !v) return true;
        return v > this.startDate;
      },
      message: 'endDate must be after startDate'
    }
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Virtual to compute remaining seats is best computed in services (here as helper)
EventSchema.virtual('isSoldOut').get(function () {
  // placeholder: actual remaining seats requires aggregation of bookings
  return false;
});

module.exports = mongoose.model('Event', EventSchema);