import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "completed", "active", "all"],
      default: "todo",
    },
    label: {
      type: String,
      default: "Bug",
    },
    priority: {
      type: String,
      enum: ["normal", "medium", "high"],
      default: "normal",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt và updatedAt tự động thêm vào
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
