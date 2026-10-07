import { body } from "express-validator";
import Tag from "../models/tag.models.js";
import Task from "../models/task.models.js";

export const createTagValidations = [
  body("name")
    .isString()
    .withMessage("name es obligatorio y debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("name no puede estar vacio")
    .bail()
    .isLength({ max: 50 })
    .withMessage("name debe tener maximo 50 caracteres")
    .bail()
    .custom(async (name) => {
      const existe = await Tag.findOne({ where: { name } });
      if (existe) {
        throw new Error("Tag existente");
      }
    }),
  body("taskIds")
    .optional()
    .isArray()
    .withMessage("taskIds debe ser una lista"),
  body("taskIds.*")
    .isInt({ min: 1 })
    .withMessage("cada id de taskIds debe ser un entero positivo")
    .bail()
    .toInt()
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error(`La tarea con id ${id} no existe`);
      }
    }),
];
