import { User } from "../types/user";
import { UserFacade } from "../facades/userFacade";
import { Request, Response } from "express";

const userFacade = new UserFacade()

export class UserController {
    save = async (req: Request, res: Response) => {
        const user: User = {
            username: req.body.username,
            password: req.body.password
        }
        if (user.username && user.password) {
            await userFacade.save(user).then(
                (data) => {
                    res.json(data)
                    return;
                }
            )
                .catch(
                    (err) => {
                        res.json({ errorMessage: err })
                        return;
                    }
                )
        } else {
            res.json({ message: 'All fields are required' })
        }
    }

    login = async (req: Request, res: Response) => {
        if (req.body.username && req.body.password) {
            await userFacade.login(req.body.username, req.body.password)
                .then(
                    (data) => {
                        if (data.code == 0) {
                            res.json({ message: data.body })
                            return;
                        } else if (data.code == 2) {
                            res.json({ message: data.body })
                            return;
                        }
                        // Set token as a cookie
                        res.cookie('jwt', data.body, {
                            httpOnly: false, // Helps prevent XSS attacks
                            maxAge: 3600000 // 1 hour
                        });
                        res.json({message:'Logged in'})
                    }
                )
                .catch(
                    (err) => {
                        res.json(err)
                    }
                )
        } else {
            res.json({ errMessage: 'All fields are required' })
        }
    }
}