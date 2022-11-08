const db = require("../database/models")
import { NextFunction, Request, Response } from "express"
import { Sequelize } from "../database/models";

class BaseRepository {
    credentials: any;
    url: string;
    body: Request['body'];
    params: Request['params'];
    query: Request['query'];

    constructor(req: Request) {
        this.credentials = req.app.locals.credentials;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
        this.url = req.protocol + '://' + req.get('host') + req.originalUrl;
    }
}

export default BaseRepository;