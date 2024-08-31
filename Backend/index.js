import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import { app, server } from "./socketIO/server.js";
import path from 'path';

dotenv.config();

//middelware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("connected to mongodb");
} catch (error) {
  console.log(error);
}

// routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

//----Deployment code------

if(process.env.NODE_ENV === "production"){
  const dirPath = path.resolve();

  app.use(express.static("./Frontend/dist"));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"));
  })
}


//server
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
