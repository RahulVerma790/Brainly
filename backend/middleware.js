"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASS);
    try {
        if (decoded) {
            //@ts-ignore 
            req.userId = decoded.userId;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not logged-in."
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
exports.authMiddleware = authMiddleware;
