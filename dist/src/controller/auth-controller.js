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
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            let transporter = yield nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                service: "gmail",
                port: 465,
                auth: {
                    user: 'ducanh.le19896@gmail.com',
                    pass: 'huznkjfpohlzkyol',
                },
            });
            user.password = yield bcrypt_1.default.hash(user.password, 10);
            user.emailToken = crypto_1.default.randomBytes(64).toString('hex');
            user = yield user_model_1.default.create(user);
            let mailOptions = {
                from: '"Verified your email 👻" <ducanh.le19896@gmail.com>',
                to: user.email,
                subject: "Verified your email✔",
                text: "Hello world?",
                html: `<h2>Hello ${user.username}!</h2>
                    <p>Thanks you registering on our site</p>
                    <h4>Please verify your email to continue ...</h4>
                    <a href="http://${req.headers.host}/users/verify-email/${user._id}">Verify Your Email</a>`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Verification email sent successfully');
                }
            });
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
                        if (user.verified == true) {
                            let payload = {
                                email: user.email,
                            };
                            let token = yield jsonwebtoken_1.default.sign(payload, `${process.env.SECRET_KEY}`, { expiresIn: 360000 });
                            res.status(200).json({ token });
                        }
                        else {
                            res.status(401).json({ message: 'Email is not verified.' });
                        }
                    }
                }
            }
        });
    }
}
exports.default = new AuthController();
