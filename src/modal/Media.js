
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  text: String,
  imageUrl: String,
  likes: Number,
  comments: [{ text: String }]
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;

