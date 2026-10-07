import { body, param } from "express-validator";
import Task from "../models/task.models.js";
import User from "../models/user.models.js";

export const taskIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("id debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("La tarea no existe");
      }
    }),
];

export const createTaskValidations = [
  body("title")
    .isString()
    .withMessage("title es obligatorio y debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("title no puede estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("title debe tener maximo 100 caracteres")
    .bail()
    .custom(async (title) => {
      const existe = await Task.findOne({ where: { title }, paranoid: false });
      if (existe) {
        throw new Error("Title existente");
      }
    }),
  body("description")
    .isString()
    .withMessage("description es obligatoria y debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("description no puede estar vacia")
    .bail()
    .isLength({ max: 100 })
    .withMessage("description debe tener maximo 100 caracteres")
    .bail()
    .custom((description, { req }) => {
      if (description === req.body.title) {
        throw new Error("description no puede ser igual a title");
      }
      return true;
    }),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe tener un valor booleano")
    .bail()
    .toBoolean(),
  body("userId")
    .isInt({ min: 1 })
    .withMessage("userId es obligatorio y debe ser un entero positivo")
    .bail()
    .toInt()
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const updateTaskValidations = [
  ...taskIdValidation,
  body("title")
    .optional()
    .isString()
    .withMessage("title debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("title no puede estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("title debe tener maximo 100 caracteres")
    .bail()
    .custom(async (title, { req }) => {
      const existe = await Task.findOne({ where: { title }, paranoid: false });
      if (existe && existe.id !== Number(req.params.id)) {
        throw new Error("Title existente");
      }
      if (req.body.description === undefined) {
        const tarea = await Task.findByPk(req.params.id);
        if (tarea && tarea.description === title) {
          throw new Error("title no puede ser igual a description");
        }
      }
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("description no puede estar vacia")
    .bail()
    .isLength({ max: 100 })
    .withMessage("description debe tener maximo 100 caracteres")
    .bail()
    .custom(async (description, { req }) => {
      let titulo = req.body.title;
      if (titulo === undefined) {
        const tarea = await Task.findByPk(req.params.id);
        titulo = tarea ? tarea.title : undefined;
      }
      if (description === titulo) {
        throw new Error("description no puede ser igual a title");
      }
    }),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe tener un valor booleano")
    .bail()
    .toBoolean(),
];

//(cambia solo paranoid: false en los dos findOne de title)