const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending', index: true },
  category: { type: String, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for efficient queries
taskSchema.index({ status: 1 });
taskSchema.index({ category: 1 });
taskSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Task', taskSchema);
