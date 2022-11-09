import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiResponses from "../utils/ApiResponses";
const db = require("../database/models")

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const authHeaders = req.headers.authorization;
        const token = authHeaders && authHeaders.split(" ")[1];

        if (token == null) {
            return ApiResponses.error(res, 'Unauthorized', 401)
        }

        let secretKey = process.env.JWT_SECRET_KEY || "secret";
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) throw ('Unauthorized')
            req.app.locals.credentials = decoded
            const refresh_token = req.cookies.refreshToken;
            if (!refresh_token) throw ('Unauthorized')
            
            return next();
        });

    } catch (error) {
        return ApiResponses.error(res, error, 401)
    }
}