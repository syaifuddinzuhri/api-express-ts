const db = require("../database/models")
import { Request, Response } from "express"
import { Sequelize } from "../database/models";
import Pagination from "../utils/Pagination";
import { queryParseInt } from "../utils/QueryParse";

class TodoService {
    credentials: {
        id: number
    };
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

    getAll = async () => {
        const where: any = {
            user_id: this.credentials.id
        };
        const whereUserRelation: any = {};
        const { description, username } = this.query;
        const page = queryParseInt(this.query.page) ?? 1
        const per_page = queryParseInt(this.query.per_page) ?? 10

        if (description) where.description = { [Sequelize.Op.like]: `%${description}%` }
        if (username) whereUserRelation.username = { [Sequelize.Op.like]: `%${username}%` }

        const { count, rows } = await db.todo.findAndCountAll({
            where,
            offset: (page - 1) * page,
            limit: per_page,
            distinct: true,
            attributes: ['id', 'description'],
            include: [
                {
                    model: db.user,
                    attributes: ['id', 'username'],
                    where: whereUserRelation
                }
            ]
        })

        const result = Pagination.paginate({
            data: rows,
            count,
            page,
            per_page
        })
        return result;
    }

    store = async () => {
        const { description } = this.body;
        const todo = await db.todo.create({
            user_id: this.credentials.id,
            description
        })
        return todo;
    }

    getById = async () => {
        const { id } = this.params;

        const todo = await db.todo.findOne({
            where: { id, user_id: this.credentials.id },
            attributes: ['id', 'description']
        })

        return todo;
    }

    update = async () => {
        const { id } = this.params;
        const { description } = this.body;

        const todo = await db.todo.update({ description }, {
            where: { id, user_id: this.credentials.id }
        })

        return todo;
    }

    delete = async () => {
        const { id } = this.params;
        const todo = await db.todo.destroy({
            where: { id, user_id: this.credentials.id }
        })
        return todo;
    }
}

export default TodoService;