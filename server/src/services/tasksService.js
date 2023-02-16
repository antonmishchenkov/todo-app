import {Tasks} from "../models/models.js";
import TaskDTO from "../dtos/taskDTO.js";

class TasksService {
    async getAllTasks() {
        const tasks = await Tasks.findAll();

        return tasks.map(task => {
            return new TaskDTO(task);
        })
    }

    async createTask(name, email, text, status = "in-progress") {
        const task = await Tasks.create({name, email, text, status});

        return new TaskDTO(task);
    }

    async updateTask(id, values) {
        const task = await Tasks.findOne({where: {id: id}});

        if (values) {
            for (let key in values) {
                task[key] = values[key];
            }
        }

        await task.save();

        return new TaskDTO(task);
    }

    async deleteTask(id) {
        const task = await Tasks.destroy({where: {id: id}});

        return task;
    }
}

export default new TasksService();