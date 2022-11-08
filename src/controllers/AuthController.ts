import { Request, Response } from "express"
import AuthRepository from "../repositories/AuthRepository";
import ApiResponses from "../utils/ApiResponses";
import Authentication from "../utils/Authentication";
const db = require("../database/models")

class AuthController {
    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req, res);
            const data = await repository.login();
            return ApiResponses.success(res, 'Login successfully', data);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req, res);
            const data = await repository.register();
            return ApiResponses.success(res, 'Register successfully', data);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

    refreshToken = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req, res);
            const data = await repository.refreshToken();
            return ApiResponses.success(res, 'Refresh token successfully', data);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }
    
    logout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req, res);
            const data = await repository.logout();
            return ApiResponses.success(res, 'Logout successfully', data);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

    profile = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository = new AuthRepository(req, res);
            const data = await repository.profile();
            return ApiResponses.success(res, 'Data has been obtained', data)
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

}

export default new AuthController();