// backend/src/routes/auth.routes.js
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // .env variables ko safely nikalna (agar undefined hai toh blank string dega)
    const envEmail = process.env.ADMIN_EMAIL || "";
    const envPassword = process.env.ADMIN_PASSWORD || "";

    // TERMINAL ME SACHAI DEKHNE KE LIYE LOGS
    console.log("-----------------------------------------");
    console.log("Frontend se aaya Email :", `'${email}'`);
    console.log("Frontend se aaya Pass  :", `'${password}'`);
    console.log(".env se mila Email     :", `'${envEmail}'`);
    console.log(".env se mila Pass      :", `'${envPassword}'`);
    console.log("-----------------------------------------");

    // .trim() ka use kar rahe hain taaki koi bhi chupa hua space na bache
    if (!email || !password) {
        return res.status(400).json({ message: "Email or password missing in request" });
    }

    if (
        email.trim() === envEmail.trim() && 
        password.trim() === envPassword.trim()
    ) {
      const secret = process.env.JWT_SECRET || 'TechveraSuperSecretKey2024';
      const token = jwt.sign(
        { role: 'admin', email }, 
        secret, 
        { expiresIn: '1d' } 
      );
      
      console.log("✅ Login Success!");
      return res.json({ success: true, token, message: "Login Successful" });
    } else {
      console.log("❌ Login Failed: Details match nahi hui!");
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;