import AuthController from "../controllers/AuthController";
import { auth } from "../middlewares/AuthMiddleware";
import loginValidator from "../validators/LoginValidator";
import registerValidator from "../validators/RegisterValidator";
import BaseRoute from "./BaseRoute";

class AuthRoute extends BaseRoute {
    public routes(): void {
        this.router.post("/register", registerValidator, AuthController.register)
        this.router.post("/login", loginValidator, AuthController.login)
        this.router.get("/refresh-token", AuthController.refreshToken)
        this.router.post("/logout", auth, AuthController.logout)
        this.router.get("/profile", auth, AuthController.profile)
    }
}

export default new AuthRoute().router;