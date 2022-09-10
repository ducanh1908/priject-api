"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("./user-route");
const auth_route_1 = require("./auth-route");
exports.router = (0, express_1.Router)();
exports.router.use('/users', user_route_1.userRoute);
exports.router.use('', auth_route_1.authRoute);
