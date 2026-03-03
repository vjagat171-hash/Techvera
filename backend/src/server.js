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
import projectRoutes from "./routes/project.routes.js"; // ✅ new import

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/projects", projectRoutes); // ✅ new route

const port = process.env.PORT || 8080;

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`API running on :${port}`)))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
