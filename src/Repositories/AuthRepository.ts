const db = require("../database/models")
import { NextFunction, Request, Response } from "express"
import { Sequelize } from "../database/models";
import Authentication from "../utils/Authentication";
import BaseRepository from "./BaseRepositoy";

class AuthRepository extends BaseRepository {

    constructor(req: Request) {
        super(req);
    }

    login = async () => {
        try {
            let { username, password } = this.body;

            // Find User
            const user = await db.user.findOne({
                where: { username },
                attributes: ['id', 'username', 'password']
            });

            // Password Check
            if (user) {
                let compare = await Authentication.passwordCompare(password, user.password);
                if (compare) {
                    // Token Generate
                    let token = Authentication.generateToken(user.id, user.username, user.password)
                    return { token };
                } else {
                    throw ('Password invalid')
                }
            }
            
            throw ('Username invalid')
        } catch (error) {
            throw error
        }
    }

    register = async () => {
        try {
            let { username, password } = this.body;
            const hashedPassword: string = await Authentication.passwordHash(password);
            const user = await db.user.create({ username, password: hashedPassword })
            return user;
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
            return profile;
        } catch (error) {
            throw error;
        }
    }

}

export default AuthRepository;