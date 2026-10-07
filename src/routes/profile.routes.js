import { Router } from "express";
import {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";
import { validateErrors } from "../middlewares/errors.middleware.js";
import {
  createProfileValidations,
  updateProfileValidations,
  profileIdValidation,
} from "../middlewares/profile.validations.js";

const router = Router();

router.post("/", createProfileValidations, validateErrors, createProfile);
router.get("/", getProfiles);
router.put("/:id", updateProfileValidations, validateErrors, updateProfile);
router.delete("/:id", profileIdValidation, validateErrors, deleteProfile);

export default router;
