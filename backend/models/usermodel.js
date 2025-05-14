import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    // References to the user's projects (not embedded)
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const User = mongoose.model('User', userSchema);

export default User;

