import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsersById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

import { validateErrors } from "../middleware/errors.middleware.js";
import {
  createUserValidations,
  updateUserValidations,
  userIdValidation,
} from "../middleware/user.validations.js";

const router = Router();

router.post("/", createUserValidations, validateErrors, createUser);
router.get("/", getUsers);
router.get("/:id", userIdValidation, getUsersById);
router.put("/:id", updateUserValidations, updateUser);
router.delete("/:id", deleteUser); 

export default router;

