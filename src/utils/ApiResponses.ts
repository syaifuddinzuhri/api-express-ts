import { Request, Response } from "express";

class ApiResponses {

    public static success(res: Response, message: string = 'Success', data: any = null, code: number = 200) {
        return res
            .status(code)
            .send({
                status: true,
                message: message,
                data: data
            })
    }

    public static error(res: Response, message: any = 'Error', code: number = 500) {
        let newMessage = 'Internal Server Error';
        
        if (process.env.APP_ENV == 'development') {
            newMessage = message;
        }

        return res
            .status(code)
            .send({
                status: false,
                message: newMessage
            })
    }

}

export default ApiResponses;