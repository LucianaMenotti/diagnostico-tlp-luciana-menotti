import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsersById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
