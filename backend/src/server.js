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

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

// --- API ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/blogs", blogRoutes); // ✅ FIXED: Changed "blog" to "blogs" to match Admin Panel
app.use("/api/projects", projectRoutes); 
app.use("/api/team", teamRoutes); // ✅ NEW: Team routes
app.use("/api/testimonials", testimonialRoutes); // ✅ NEW: Testimonial routes

const port = process.env.PORT || 8080;

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`API running on :${port}`)))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });