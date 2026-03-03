// backend/src/routes/auth.routes.js  (FINAL - ESM)
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Admin Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // .env se Email aur Password check
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Token generate
      const token = jwt.sign(
        { role: "admin", email },
        process.env.JWT_SECRET || "fallbackSecret",
        { expiresIn: "1d" }
      );

      return res.json({ success: true, token, message: "Login Successful" });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid Email or Password" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
