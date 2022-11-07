import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import { config as dotenv } from "dotenv"
import TodoRoute from "./routes/TodoRoute";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json())
        this.app.use(morgan("dev"))
        this.app.use(compression())
        this.app.use(helmet())
        this.app.use(cors())
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Welcome to API Express using Typescript")
        })

        this.app.use("/api/v1/users", UserRoute)
        this.app.use("/api/v1/auth", AuthRoute)
        this.app.use("/api/v1/todos", TodoRoute)
    }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log('Aplikasi ini berjalan di port ' + port)
})