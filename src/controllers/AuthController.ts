import { Request, Response } from "express"
import AuthRepository from "../Repositories/AuthRepository";
import ApiResponses from "../utils/ApiResponses";
import Authentication from "../utils/Authentication";
const db = require("../database/models")

class AuthController {
    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req);
            const data = await repository.login();
            return ApiResponses.success(res, 'Login successfully', data);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req);
            const data = await repository.register();
            return ApiResponses.success(res, 'Register successfully', data);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

    profile = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req);
            const data = await repository.profile();
            return ApiResponses.success(res, 'Data has been obtained', data)
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

}

export default new AuthController();