
import express from "express"
import AuthRouter from './authRoutes.js'
import ProtectedRoutes from './protectedRoutes.js'
import cors from 'cors'
import authenticationToken from "./utils/authMiddleware.js";
import cookieParser from "cookie-parser";
import path from "node:path";
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static("uploads"));
app.use('/api/auth',AuthRouter)
app.use('/api/private',authenticationToken,ProtectedRoutes)

app.get('/uploads/:filename',async(req,res)=>{

  const absolutePath = path.join(__dirname,"..","uploads",req.params.filename)
  
  return res.sendFile(absolutePath)
})

app.listen(3003,()=>{
    console.log("listening at 3003")
})

