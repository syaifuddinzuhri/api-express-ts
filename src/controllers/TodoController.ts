import { Request, Response } from "express"
import IController from "./interfaces/IController"
import ApiResponses from "../utils/ApiResponses";
import TodoRepository from "../Repositories/TodoRepository";
class TodoController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository: TodoRepository = new TodoRepository(req);
            const todos = await repository.getAll()
            return ApiResponses.success(res, 'Data has been obtained', todos);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository: TodoRepository = new TodoRepository(req);
            const todo = await repository.store()
            return ApiResponses.success(res, 'Data added successfully', todo, 201);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }
    show = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository: TodoRepository = new TodoRepository(req);
            const todo = await repository.getById()
            return ApiResponses.success(res, 'Data has been obtainer', todo);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository: TodoRepository = new TodoRepository(req);
            const todo = await repository.update()
            return ApiResponses.success(res, 'Data updated successfully', todo);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repository: TodoRepository = new TodoRepository(req);
            const todo = await repository.delete()
            return ApiResponses.success(res, 'Data deleted successfully', todo);
        } catch (error) {
            return ApiResponses.error(res, error, 500)
        }
    }

}

export default new TodoController();