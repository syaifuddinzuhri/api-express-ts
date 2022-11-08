const db = require("../database/models")
import { Request, Response } from "express"
import todo from "../database/models/todo";

class TodoService {
    credentials: {
        id: number
    };
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.credentials = req.app.locals.credentials;
        this.body = req.body;
        this.params = req.params;
    }

    getAll = async () => {
        const todos = await db.todo.findAll({
            where: {
                user_id: this.credentials.id
            },
            attributes: ['id', 'description']
        })
        return todos;
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