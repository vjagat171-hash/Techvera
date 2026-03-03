// backend/src/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // Project ki image ka link
  liveLink: { type: String }, // Website ka URL
  category: { type: String, default: "Web Development" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
