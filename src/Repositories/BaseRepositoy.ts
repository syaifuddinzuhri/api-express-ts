import { Request, Response } from "express"

class BaseRepository {
    credentials: any;
    res: Response;
    url: string;
    body: Request['body'];
    cookies: Request['cookies'];
    params: Request['params'];
    query: Request['query'];
    headers: Request['headers'];

    constructor(req: Request, res: Response) {
        this.res = res;
        this.credentials = req.app.locals.credentials;
        this.body = req.body;
        this.params = req.params;
        this.headers = req.headers;
        this.cookies = req.cookies;
        this.query = req.query;
        this.url = req.protocol + '://' + req.get('host') + req.originalUrl;
    }
}

export default BaseRepository;