import { Request, Response, NextFunction } from "express";

import User from "../models/user-model";
class Usercontroller {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };
  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    let idUser = req.params.id;
    try {
      await User.findByIdAndDelete(idUser);
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  };
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let idUser = req.params.id;
    // let user = await User.findById(idUser)
    // if(!user) {
    //     res.status(404).json()
    // }
    // else {
    //     let data = req.body;
    //     await User.findOneAndUpdate({
    //         _id: idUser
    //     }, data);
    //     data._id = idUser
    //     res.status(200).json(data)
    // }
    try {
      const updateUser = await User.findByIdAndUpdate(
        idUser,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  };
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    let idUser = req.params.id;
    try {
        let user = await User.findById(idUser);
        res.status(200).json(user);
     }
     catch (e) {
        next(e);
      }

  }
  verifyEmail= async (req: Request, res: Response) => {
    
    let id = req.params.id
    console.log(id);
    let user = await User.findOne({_id: id})
    if(!user) {
      res.status(401).json({
        message: "Email is not verified"
      })
    }
    else {
      await User.updateOne({ _id:id}, {verified: true});
      res.status(200).json({
        message: "Email is verified" })
    }
  }
}
export default new Usercontroller();
