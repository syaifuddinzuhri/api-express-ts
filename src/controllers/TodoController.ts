import { Request, Response } from "express"
import IController from "./interfaces/IController"
const db = require("../database/models")

let data: any[] = []

class TodoController implements IController {

    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.app.locals.credentials;

            const todos = await db.todo.findAll({
                where: {
                    user_id: id
                },
                attributes: ['id', 'description']
            })
            return res.send({
                message: 'Success',
                data: todos
            })
        } catch (error) {
            return res.send(error)
        }
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.app.locals.credentials;
            const { description } = req.body;

            const todo = await db.todo.create({
                user_id: id,
                description
            })
            return res.send({
                message: 'Success',
                data: todo
            })
        } catch (error) {
            return res.send(error)
        }
    }
    show = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id: user_id } = req.app.locals.credentials;
            const { id } = req.params;

            const todos = await db.todo.findOne({
                where: { id, user_id },
                attributes: ['id', 'description']
            })
            return res.send({
                message: 'Success',
                data: todos
            })
        } catch (error) {
            return res.send(error)
        }
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id: user_id } = req.app.locals.credentials;
            const { id } = req.params;
            const { description } = req.body;

            await db.todo.update({ description }, {
                where: { id, user_id }
            })

            const newTodo = await db.todo.findOne({
                where: { id, user_id },
                attributes: ['id', 'description']
            })

            return res.send({
                message: 'Success',
                data: newTodo
            })
        } catch (error) {
            return res.send(error)
        }
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id: user_id } = req.app.locals.credentials;
            const { id } = req.params;
            await db.todo.destroy({
                where: { id, user_id }
            })

            return res.send({
                message: 'Success',
                data: null
            })
        } catch (error) {
            return res.send(error)
        }
    }

}

export default new TodoController();