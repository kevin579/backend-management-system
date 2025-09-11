import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from 'dotenv'
import {v4 as uuid} from 'uuid'
import bcrypt from "bcrypt";


import connectDB from './db/db.js'
import model from "./db/model.js";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

// Middleware: Verify captcha with Google
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

//Handle login
app.post("/api/login",checkCaptcha,async (req, res) => {
  const { username, password } = req.body;
  const storedUser = await model.find({uname:username})
  if (storedUser.length>0){
    const isMatch = await bcrypt.compare(password, storedUser[0].password);
  if (isMatch) {
    return res.json({ message: "Login success" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
   }
   
});

// Handle Register
app.post("/api/register",checkCaptcha, async (req, res) => {

  const { username, password, password2 } = req.body;
  const repeat = await model.find({uname:username})

  //check for username
  if (!username){
    return res.json({state:10,message:'Username must not be empty'});
  }
  if (repeat.length>0){
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

  try {
    model.create({
      id:uuid(),
      uname:username,
      password:await bcrypt.hash(password, 10) 
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("invalid login");
  }

  return res.json({state:0,message:'Registered successfully'});
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
