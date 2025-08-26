import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const RECAPTCHA_SECRET = "6LdSXLMrAAAAAHcjG_xxNEQciklYb5pOeUfBu_Zy";

app.post("/api/login", async (req, res) => {
  const { username, password, captcha } = req.body;

  // 1. Verify captcha with Google
  try {
    const captchaVerify = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${captcha}`
    );

    if (!captchaVerify.data.success) {
      return res.status(400).json({ message: "Captcha failed" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Captcha verification error" });
  }

  // 2. Verify username & password (mock)
  if (username === "admin" && password === "1234") {
    return res.json({ message: "Login success" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
