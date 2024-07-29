import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY!


export class AuthMiddleware {
    authenticate = (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt+'U';
        if (token) {
            jwt.verify(token, secretKey, (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403); // Forbidden
                }
                next();
            });
        } else {
            res.sendStatus(401); // Unauthorized
        }
    }
}