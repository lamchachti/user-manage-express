import { UserController } from '../controllers/userController'
import express from 'express'
import {AuthMiddleware} from '../middlewares/authMiddleware'

const userRouter= express.Router()
const userController=new UserController()
const authMiddleware= new AuthMiddleware()


userRouter
         .post('/create',userController.save)
         .post('/login',userController.login)
         .get('/sensitive-resource',authMiddleware.authenticate,(req,res)=>{
            res.send('All authorized users can see me')
         })


export {userRouter}