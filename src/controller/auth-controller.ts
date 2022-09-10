import User from '../models/user-model';

import { Request , Response} from 'express';

class AuthController {

    register = async(req:Request, res:Response) => {
        let user = req.body
        user = await User.create(user)
        res.status(200). json(user)
    }
}
export default new  AuthController();