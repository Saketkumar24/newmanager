import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tasks: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        status: {
          type: String,
          enum: ['pending', 'In Progress', 'Completed'],
          default: 'pending',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        completedAt: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
