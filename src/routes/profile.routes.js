import { Router } from "express";
import {
  createProfile,
  getProfiles,
} from "../controllers/profile.controller.js";
import { validateErrors } from "../middlewares/errors.middleware.js";
import { createProfileValidations } from "../middlewares/profile.validations.js";

const router = Router();

router.post("/", createProfileValidations, validateErrors, createProfile);
router.get("/", getProfiles);

export default router;
