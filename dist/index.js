"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./src/routes/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const DB_URL = `${process.env.MONGO_URL}`;
mongoose_1.default.connect(DB_URL).then(() => {
    console.log("Connected to MongoDB");
})
    .catch(err => console.log("MongoDB error: " + err));
app.use(body_parser_1.default.json());
app.use("", routes_1.router);
app.listen(`${process.env.PORT}`, () => {
    console.log(`Express server listening on ${process.env.PORT}`);
});
