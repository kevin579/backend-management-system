import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

  // 1. Verify captcha with Google
const checkCaptcha = async(req,res,next)=>{
  const {captcha} = req.body;
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
  next();
}

app.post("/api/login",checkCaptcha,(req, res) => {
  const { username, password } = req.body;

   if (username === "admin" && password === "1234") {
    return res.json({ message: "Login success" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/register",checkCaptcha,(req, res) => {
  const { username, password, password2 } = req.body;

  console.log(password,password2);

  //check for username
  if (!username){
    return res.json({state:10,message:'Username must not be empty'});
  }
  if (username ==='admin'){
    return res.json({state:11,message:'Username already exist'});
  }

  //check for password
  if (password != password2){
    return res.json({state:20,message:'Password does not match'});
  }
  if (password.length<8){
    return res.json({state:21,message:'Password must be at least 8 characters long'});
  }

  const numRule = /[0-9]/
  const letterRule = /[A-Za-z]/
  if (!numRule.test(password)){
    return res.json({state:22,message:'Password must contain numberss'});
  }
  if (!letterRule.test(password)){
    return res.json({state:23,message:'Password must contain letters'});
  }

  return res.json({state:0,message:'Registered successfully'});
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
