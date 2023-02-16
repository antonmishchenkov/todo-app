import {AxiosResponse} from "axios";
import $api from "../http/todoApi";
import {ITask} from "../types/tasks";

export default class TasksService {
    static async getAllTasks(): Promise<AxiosResponse<ITask[]>> {
        return $api.get<ITask[]>('/tasks')
    }

    static async createTask(name: string, email: string, text: string): Promise<AxiosResponse<ITask>> {
        return $api.post<ITask>('/task', {name, email, text})
    }

    static async updateTask(id: number, values: object): Promise<AxiosResponse<ITask>> {
        return $api.put<ITask>(`/task/${id}`, {values})
    }

    static async deleteTask(id: number): Promise<AxiosResponse<ITask>> {
        return $api.delete<ITask>(`/task/${id}`)
    }
}