const db = require("../database/models")
import { NextFunction, Request, Response } from "express"
import { Sequelize } from "../database/models";
import Authentication from "../utils/Authentication";
import BaseRepository from "./BaseRepositoy";

class AuthRepository extends BaseRepository {

    constructor(req: Request, res: Response) {
        super(req, res);
    }

    login = async () => {
        try {
            let { username, password } = this.body;
            const user = await db.user.findOne({
                where: { username },
                attributes: ['id', 'username', 'password']
            });
            if (!user) throw ('Username invalid')

            let compare = await Authentication.passwordCompare(password, user.password);
            if (!compare) throw ('Password invalid')

            let access_token = Authentication.generateAccessToken(user.id, user.username, user.password)
            let refresh_token = Authentication.generateRefreshToken(user.id, user.username, user.password)

            await db.user.update({ refresh_token }, {
                where: { id: user.id }
            })

            this.res.cookie('refreshToken', refresh_token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })

            return { access_token };
        } catch (error) {
            throw error
        }
    }

    register = async () => {
        try {
            let { username, password } = this.body;
            const hashedPassword: string = await Authentication.passwordHash(password);
            const user = await db.user.create({ username, password: hashedPassword })
            const data = await db.user.findOne({
                where: { id: user.id },
            })
            return data;
        } catch (error) {
            throw error;
        }
    }

    refreshToken = async () => {
        try {
            const refresh_token = this.cookies.refreshToken;
            if (!refresh_token) throw ('Token invalid');
            
            const user = await db.user.findOne({
                where: { refresh_token },
            });

            if (!user) throw ('Token invalid');

            let verify_refresh_token = Authentication.verifyRefreshToken(refresh_token);
            if (verify_refresh_token != true) throw ('Token invalid')

            const access_token = Authentication.generateAccessToken(user.id, user.username, user.password);
            return { access_token };
        } catch (error) {
            throw error;
        }
    }

    logout = async () => {
        try {
            const refresh_token = this.cookies.refreshToken;
            if (!refresh_token) throw ('Token invalid')

            const user = await db.user.findOne({
                where: { refresh_token },
            });

            if (!user) throw ('Token invalid');

            await db.user.update({ refresh_token: null }, {
                where: { id: user.id }
            })
            this.res.clearCookie('refreshToken')
            return null;
        } catch (error) {
            throw error;
        }
    }

    profile = async () => {
        try {
            const { id } = this.credentials;
            const profile = await db.user.findOne({
                where: { id },
            })

            if (!profile) throw ('Unauthorized')

            return profile;
        } catch (error) {
            throw error;
        }
    }

}

export default AuthRepository;