import mongoose from 'mongoose';

const UserFileSchema = new mongoose.Schema(
  {
    photo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export default mongoose.model('UserFile', UserFileSchema);
