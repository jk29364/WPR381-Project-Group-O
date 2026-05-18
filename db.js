const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace with your MongoDB connection string
    // For local MongoDB: 'mongodb://localhost:27017/wpr381'
    // For MongoDB Atlas: 'mongodb+srv://username:password@cluster.mongodb.net/dbname'
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wpr381';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
