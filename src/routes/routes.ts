import  { Router } from 'express';
import { userRoute } from './user-route';
import { authRoute } from './auth-route';
export const router = Router()
router.use('/users',userRoute )
router.use('/register',authRoute)
