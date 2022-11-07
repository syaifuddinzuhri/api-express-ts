import TodoController from "../controllers/TodoController";
import { auth } from "../middlewares/AuthMiddleware";
import todoValidator from "../validators/TodoValidator";
import BaseRoute from "./BaseRoute";

class TodoRoute extends BaseRoute {
    public routes(): void {
        this.router.get("/", auth, TodoController.index)
        this.router.post("/", auth, todoValidator, TodoController.create)
        this.router.get("/:id", auth, TodoController.show)
        this.router.put("/:id", auth, todoValidator, TodoController.update)
        this.router.delete("/:id", auth, TodoController.delete)
    }
}

export default new TodoRoute().router;