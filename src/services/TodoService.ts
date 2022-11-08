const db = require("../database/models")
import { Request, Response } from "express"
import { getPage, getPerPage, pagination } from "../utils/Pagination";

class TodoService {
    credentials: {
        id: number
    };
    body: Request['body'];
    params: Request['params'];
    query: Request['query'];

    constructor(req: Request) {
        this.credentials = req.app.locals.credentials;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }

    getAll = async () => {
        const page = getPage(this.query.page)
        const per_page = getPerPage(this.query.per_page)

        const { count, rows } = await db.todo.findAndCountAll({
            where: {
                user_id: this.credentials.id
            },
            offset: (page - 1) * page,
            limit: per_page,
            distinct: true,
            attributes: ['id', 'description'],
            include: [
                { model: db.user, attributes: ['id', 'username'] }
            ]
        })

        const result = pagination({
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