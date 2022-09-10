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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            user.password = yield bcrypt_1.default.hash(user.password, 10);
            user = yield user_model_1.default.create(user);
            res.status(200).json(user);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let loginFrom = req.body;
            let user = yield user_model_1.default.findOne({
                email: loginFrom.email
            });
            if (!user) {
                res.status(401).json({ message: 'User is not exits.' });
            }
            else {
                if (user.password) {
                    let comparePassword = yield bcrypt_1.default.compare(loginFrom.password, user.password);
                    if (!comparePassword) {
                        res.status(401).json({ message: 'Incorrect password.' });
                    }
                    else {
                        let payload = {
                            email: user.email,
                        };
                        let token = yield jsonwebtoken_1.default.sign(payload, `${process.env.SECRET_KEY}`, { expiresIn: 360000 });
                        res.status(200).json({ token });
                    }
                }
            }
        });
    }
}
exports.default = new AuthController();
