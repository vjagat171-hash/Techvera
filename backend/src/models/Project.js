import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "MERN Stack" },
    status: { type: String, default: "Live" }, // e.g., Live, Beta, Done
    description: { type: String, required: true },
    tech: [{ type: String }], // Array for technologies like ["React", "Node"]
    imageUrl: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    repoLink: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);