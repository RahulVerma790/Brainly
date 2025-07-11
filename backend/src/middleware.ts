import { NextFunction, Request, Response } from "express";
import {JWT_PASS} from "./config";
import jwt from "jsonwebtoken";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token as string, JWT_PASS);

    try {
        if(decoded){
            //@ts-ignore 
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                message: "You are not logged-in."
            })
        }
    } catch(error){
        res.status(500).json({
            message: "Internal server error"
        })
    }
}