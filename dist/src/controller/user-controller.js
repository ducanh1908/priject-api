"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
class Usercontroller {
    constructor() {
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.find();
                res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idUser = req.params.id;
            try {
                yield user_model_1.default.findByIdAndDelete(idUser);
                res.status(200).json();
            }
            catch (e) {
                next(e);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                const updateUser = yield user_model_1.default.findByIdAndUpdate(idUser, { $set: req.body }, { new: true });
                res.status(200).json(updateUser);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new Usercontroller();
