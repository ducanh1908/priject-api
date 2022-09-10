import { Router } from "express";

import userController from "../controller/user-controller";

export const userRoute =  Router();

userRoute.get("", userController.getAll)
userRoute.delete("/:id", userController.deleteUser);
userRoute.put("/:id", userController.updateUser);