import { Router } from "express";
import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { validateErrors } from "../middlewares/errors.middleware.js";
import {
  tagIdValidation,
  createTagValidations,
  updateTagValidations,
} from "../middlewares/tag.validations.js";

const router = Router();

router.post("/", createTagValidations, validateErrors, createTag);
router.get("/", getTags);
router.put("/:id", updateTagValidations, validateErrors, updateTag);
router.delete("/:id", tagIdValidation, validateErrors, deleteTag);

export default router;
