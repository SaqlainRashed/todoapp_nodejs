import express from "express";
import { deleteTask, getMyTasks, newTask, updateStatus, updateTask } from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTasks);

router.route("/:id")
    .put(isAuthenticated, updateStatus)
    .delete(isAuthenticated, deleteTask)
    .post(isAuthenticated, updateTask);

export default router;