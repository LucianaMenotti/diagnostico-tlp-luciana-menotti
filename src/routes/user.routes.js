import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsersById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { validateErrors } from "../middlewares/errors.middleware.js";
import {
  createUserValidations,
  updateUserValidations,
  userIdValidation,
} from "../middlewares/user.validations.js";

const router = Router();

router.post("/", createUserValidations, validateErrors, createUser);
router.get("/", getUsers);
router.get("/:id", userIdValidation, validateErrors, getUsersById);
router.put("/:id", updateUserValidations, validateErrors, updateUser);
router.delete("/:id", userIdValidation, validateErrors, deleteUser);

export default router;
