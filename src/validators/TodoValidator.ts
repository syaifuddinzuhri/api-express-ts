import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import ApiResponses from "../utils/ApiResponses";

const todoValidator = [
    check('description').isString(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return ApiResponses.error(res, errors.array(), 422)
        }
        return next();
    }
]

export default todoValidator;