import { UserModel } from "../models/userModel";
import { User } from "../types/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { LoginResponse } from "../types/loginResponse";
dotenv.config();
const secretKey = process.env.SECRET_KEY!
export class UserFacade {
    async save(user: User): Promise<string> {
        //hash password 
        const saltRounds: number = 10
        const hashedPassword: string = await bcrypt.hash(user.password, saltRounds)
        user.password = hashedPassword;
        if (await new UserModel().exists(user.username)) {
            return 'User Already exists'
        }
        const saveFlag = await new UserModel().save(user)
        if (saveFlag) {
            return 'New User created'
        }
        return 'Connot create the user, try again!'
    }
    async login(username: string, password: string): Promise<LoginResponse> {
        let code:number=0 // 0-> Login failed | 1-> Logged in | 2 -> Password incorrect
        let body:string='Login failed'
        const userOrNull = await new UserModel().login(username)
        if (userOrNull) {
            const user: User = userOrNull;
            const passwordIsValid = await bcrypt.compare(password, user.password)
            if (passwordIsValid) {
                const token = jwt.sign(
                    { id: user.user_id, username: user.username, password: user.password },
                    secretKey,
                    { expiresIn: '1h' }
                )
                
                return {code:1,body:token} as LoginResponse;
            }
            return {code:3,body:'Password incorrect'} as LoginResponse
        } else {
            return {code:code,body:body} as LoginResponse
        }
    }
}