import express from "express"
const app = express()
import cors from "cors"
import authroute from "./routes/auth.route.mjs"
import {connectMongoDB} from "./db/connectMongoDB.mjs"
import postroute from "./routes/post.route.mjs"
import userroute from "./routes/user.route.mjs"
import cookieParser from "cookie-parser"
import notificationRoute from "./routes/notification.route.mjs"
import multer from "multer"
import { protectedRoute } from "./middleware/protectedRoute.mjs"
import { createPost } from "./controllers/post.controller.mjs"
import path from "path"
import dotenv from "dotenv"

import {v2 as cloudinary} from 'cloudinary';

dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

//Multer strorage cofiguration for images and videos
console.log("this is before", process.env.api_key, process.env.api_secret, process.env.cloud_name)
const imageStorage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, './images')
  },
  filename:(req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

//Multer Upload Instances
const imageUpload = multer({storage:imageStorage})


app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials:true, origin:"http://localhost:5173"}))
app.use("/api/post/createpost",protectedRoute, imageUpload.single("file"), createPost)
app.use(express.json())


app.use("/api/auth", authroute)
app.use('/api/post', postroute)
app.use('/api/user', userroute)
app.use('/api/notification', notificationRoute)


app.listen(7000, () => {
    connectMongoDB() 
    console.log("app running on port 7000...")
})
