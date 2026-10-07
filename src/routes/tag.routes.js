import { Router } from "express";
import { createTag, getTags } from "../controllers/tag.controller.js";
import { validateErrors } from "../middlewares/errors.middleware.js";
import { createTagValidations } from "../middlewares/tag.validations.js";

const router = Router();

router.post("/", createTagValidations, validateErrors, createTag);
router.get("/", getTags);

export default router;
