import { Router } from "express";
import {
  createProfile,
  getProfiles,
} from "../controllers/profile.controller.js";

const router = Router();

router.post("/", createProfile);
router.get("/", getProfiles);

export default router;
