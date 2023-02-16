import Router from "express";
import tasksController from "../controllers/tasksController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
export const router = new Router();

router.get("/tasks", tasksController.getAllTasks);
router.post("/task", tasksController.createTask);
router.put("/task/:id", authMiddleware, tasksController.updateTask);
router.delete("/task/:id", authMiddleware, tasksController.deleteTask);





