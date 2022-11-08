import { Request, Response } from "express"
import IController from "./interfaces/IController"
import TodoService from "../services/TodoService"

class TodoController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: TodoService = new TodoService(req);
            const todos = await service.getAll()
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
            const service: TodoService = new TodoService(req);
            const todo = await service.store()
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
            const service: TodoService = new TodoService(req);
            const todo = await service.getById()
            return res.send({
                message: 'Success',
                data: todo
            })
        } catch (error) {
            return res.send(error)
        }
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: TodoService = new TodoService(req);
            const todo = await service.update()

            return res.send({
                message: 'Success',
                data: todo
            })
        } catch (error) {
            return res.send(error)
        }
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: TodoService = new TodoService(req);
            const todo = await service.delete()
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