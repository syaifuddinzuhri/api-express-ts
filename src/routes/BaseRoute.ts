import { Router } from "express";
import IRouter from "./interfaces/IRouter";

abstract class BaseRoute implements IRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    abstract routes(): void;
}

export default BaseRoute;