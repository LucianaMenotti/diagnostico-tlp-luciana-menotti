import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { validateErrors } from "../middlewares/errors.middleware.js";
import {
  createTaskValidations,
  updateTaskValidations,
  taskIdValidation,
} from "../middlewares/task.validations.js";

const router = Router();

router.post("/", createTaskValidations, validateErrors, createTask);
router.get("/", getTasks);
router.get("/:id", taskIdValidation, validateErrors, getTaskById);
router.put("/:id", updateTaskValidations, validateErrors, updateTask);
router.delete("/:id", taskIdValidation, validateErrors, deleteTask);

export default router;
