import {Request,Response} from 'express'
import express from 'express'
import { userRouter } from './routes/user'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app= express()
const PORT= 3200

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser()); // Add cookie-parser middleware

app.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to Express API')
})
app.use('/api/user',userRouter)

app.listen(PORT)
