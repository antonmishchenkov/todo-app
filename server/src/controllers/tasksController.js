import tasksService from "../services/tasksService.js";

class TasksController {
    async getAllTasks(req, res, next) {
        try {
            const tasks = await tasksService.getAllTasks();

            return res.json(tasks);
        } catch(e) {
            next(e);
        }
    }

    async createTask(req, res, next) {
        try {
            const { name, email, text } = req.body;

            const task = await tasksService.createTask(name, email, text);

            return res.json(task);
        } catch(e) {
            next(e);
        }
    }

    async updateTask(req, res, next) {
        try {
            const id = req.params.id;
            const { values } = req.body;

            const task = await tasksService.updateTask(id, values);

            return res.json(task);
        } catch(e) {
            next(e);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const id = req.params.id;

            const task = await tasksService.deleteTask(id);

            res.json(task);
        } catch(e) {
            next(e);
        }
    }
}

export default new TasksController();