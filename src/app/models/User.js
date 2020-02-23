import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    rg: {
      type: String,
      required: true,
      unique: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    mother_name: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Users', UserSchema);
