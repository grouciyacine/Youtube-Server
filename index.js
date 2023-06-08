import express from 'express'
import connect from './connect.js'
import dotenv from 'dotenv'
import AuthRouter from './routes/auth.js'
import  VideosRouter from './routes/videos.js'
import UserRouter from './routes/user.js'
import CommentRouter from './routes/comment.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
    })
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/videos',VideosRouter)
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/comment',CommentRouter)
dotenv.config()
const start=async()=>{
    try{
        await connect(process.env.MM)
        app.listen(5000,()=>console.log('listening on port in 5000'))
    }catch(e){
        console.log(e)
    }
}
start()
