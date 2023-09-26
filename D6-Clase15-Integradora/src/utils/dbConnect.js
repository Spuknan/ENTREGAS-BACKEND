import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

dotenv.config();

const dbConnect = () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB'.bgGreen);
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
};

export default {
  dbConnect,
};