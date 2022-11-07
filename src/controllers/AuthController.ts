import { Request, Response } from "express"
import Authentication from "../utils/Authentication";
const db = require("../database/models")

class AuthController {
    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { username, password } = req.body;

            // Find User
            const user = await db.user.findOne({ where: { username } });

            // Password Check
            if (user) {
                let compare = await Authentication.passwordCompare(password, user.password);

                if (compare) {
                    // Token Generate
                    let token = Authentication.generateToken(user.id, user.username, user.password)
                    return res.send({
                        token
                    })
                } else {
                    return res.send('Password invalid')
                }
            }

            return res.send('Username invalid or not found')
        } catch (error) {
            return res.send(error)
        }
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { username, password } = req.body;
            const hashedPassword: string = await Authentication.passwordHash(password);
            const createUser = await db.user.create({ username, password: hashedPassword })
            return res.send('Register successfully!')
        } catch (error) {
            return res.send(error)
        }
    }

    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credentials);
    }

}

export default new AuthController();