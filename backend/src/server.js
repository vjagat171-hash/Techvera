import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import projectRoutes from "./routes/project.routes.js"; 
import teamRoutes from "./routes/team.routes.js";
import testimonialRoutes from "./routes/testimonials.routes.js";
import uploadRoutes from "./routes/upload.routes.js"; // ✅ New Import

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" })); // Limit thodi badha di
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/blogs", blogRoutes); // ✅ FIXED: Plural "blogs"
app.use("/api/projects", projectRoutes); 
app.use("/api/team", teamRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/upload", uploadRoutes); // ✅ NEW: Upload Route

const port = process.env.PORT || 8080;

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`API running on :${port}`)))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });