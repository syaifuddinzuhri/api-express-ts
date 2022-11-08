const db = require("../database/models")
import { Request, Response } from "express"
import { Sequelize } from "../database/models";
import paginate from "../utils/Pagination";
import { queryParseInt } from "../utils/QueryParse";
import BaseRepository from "./BaseRepositoy";

class TodoRepository extends BaseRepository {

    constructor(req: Request, res: Response) {
        super(req, res);
    }

    getAll = async () => {
        try {
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

            const result = paginate({
                data: rows,
                count,
                page,
                per_page
            })
            return result;
        } catch (error) {
            throw error
        }
    }

    store = async () => {
        try {
            const { description } = this.body;
            const todo = await db.todo.create({
                user_id: this.credentials.id,
                description
            })
            return todo;
        } catch (error) {
            throw error
        }
    }

    getById = async () => {
        try {
            const { id } = this.params;

            const todo = await db.todo.findOne({
                where: { id, user_id: this.credentials.id },
                attributes: ['id', 'description']
            })

            if (!todo) throw ('Data not found');

            return todo;
        } catch (error) {
            throw error
        }
    }

    update = async () => {
        try {
            const data = await this.getById();

            const { description } = this.body;
            const todo = await db.todo.update({ description }, {
                where: { id: data.id, user_id: this.credentials.id }
            })

            return todo;
        } catch (error) {
            throw error
        }
    }

    delete = async () => {
        try {
            const data = await this.getById();

            await db.todo.destroy({
                where: { id: data.id, user_id: this.credentials.id }
            })
            return data;
        } catch (error) {
            throw error
        }
    }
}

export default TodoRepository;