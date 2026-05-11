
import express from "express"
import AuthRouter from './authRoutes.js'
import ProtectedRoutes from './protectedRoutes.js'
import cors from 'cors'
import authenticationToken from "./utils/authMiddleware.js";
import cookieParser from "cookie-parser";
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',AuthRouter)
app.use('/api/private',authenticationToken,ProtectedRoutes)

app.listen(3003,()=>{
    console.log("listening at 3003")
})

