
import express from "express"
import AuthRouter from './authRoutes.js'

const app = express()
app.use(express.json())
app.use('/api/auth',AuthRouter)

app.listen(3003,()=>{
    console.log("listening at 3003")
})