
import express from "express"
import AuthRouter from './authRoutes.js'
import ProtectedRoutes from './protectedRoutes.js'
import cors from 'cors'
import authenticationToken from "./utils/authMiddleware.js";
import cookieParser from "cookie-parser";
import path from "node:path";
const app = express()

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

const PORT = process.env.PORT || 3003
app.listen(PORT,()=>{
    console.log(`listening at ${PORT}`)
})

