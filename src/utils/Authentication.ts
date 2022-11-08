import bycrypt from "bcrypt";
import { Request } from "express";
import { header } from "express-validator";
import jwt, { decode } from "jsonwebtoken";

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bycrypt.hash(password, 10)
    }

    public static passwordCompare = async (password: string, encryptedPassword: string): Promise<boolean> => {
        let result = await bycrypt.compare(password, encryptedPassword);
        return result;
    }

    public static generateAccessToken = (id: number, username: string, password: string): any => {
        const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';
        const jwtTtl: number = process.env.JWT_TTL ? parseInt(process.env.JWT_TTL) : 60;
        const token: string = jwt.sign({ id, username, password }, secretKey, { expiresIn: '20s' });
        return token;
    }

    public static generateRefreshToken = (id: number, username: string, password: string): any => {
        const secretKey: string = process.env.JWT_REFRESH_SECRET_KEY || 'secret';
        const jwtTtl: number = process.env.JWT_TTL ? parseInt(process.env.JWT_TTL) : 60;
        const token: string = jwt.sign({ id, username, password }, secretKey, { expiresIn: '60s' });
        return token;
    }

    public static verifyRefreshToken = (refresh_token: string): any => {
        try {
            const secretKey: string = process.env.JWT_REFRESH_SECRET_KEY || 'secret';
            jwt.verify(refresh_token, secretKey, (err, decoded) => {
                if (err) throw (err.message)
                return true;
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    public static destroy = (headers: any): any => {
        const authHeaders = headers.authorization;
        const token = authHeaders && authHeaders.split(" ")[1];
        return token;
    }
}

export default Authentication;