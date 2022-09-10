import User from '../models/user-model';
import bcrypt from "bcrypt"
import { Request , Response} from 'express';
import jwt from "jsonwebtoken"
class AuthController {

    register = async(req:Request, res:Response) => {
        let user = req.body
        user.password = await bcrypt.hash(user.password, 10)
        user = await User.create(user)
        res.status(200).json(user)
    }

    login = async (req:Request, res:Response) => {
        let loginFrom = req.body
        let user = await User.findOne({
            email: loginFrom.email
        })
        if(!user) {
            res.status(401).json({ message: 'User is not exits.'});
        }
        else {
            if(user.password){
                let comparePassword = await bcrypt.compare(loginFrom.password,user.password)
                if(!comparePassword){
                    res.status(401).json({ message: 'Incorrect password.' })
                }
                else {
                    let payload= {
                        email: user.email,
                    }
                    let token = await jwt.sign(payload,`${process.env.SECRET_KEY}`, {expiresIn : 360000} )
                    res.status(200).json({ token })
                }
            }
        }

    }
}
export default new  AuthController();