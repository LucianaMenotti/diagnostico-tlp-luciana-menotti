import { body, param } from "express-validator";
import User from "../models/user.models.js";

//Validaciones de los ids de la URL
export const userIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("id debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const createUserValidations = [
  body("name")
    .isString()
    .withMessage("name es obligatorio y debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("name no puede estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("name debe tener maximo 100 caracteres"),
  body("email")
    .isString()
    .withMessage("email es obligatorio y debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("email no puede estar vacio")
    .bail()
    .isEmail()
    .withMessage("email debe tener un formato valido")
    .bail()
    .isLength({ max: 100 })
    .withMessage("email debe tener maximo 100 caracteres")
    .bail()
    .custom(async (email) => {
      const existe = await User.findOne({ where: { email } });
      if (existe) {
        throw new Error("Ese email ya existe");
      }
    }),
  body("password")
    .isString()
    .withMessage("password es obligatorio y debe ser texto")
    .bail()
    .notEmpty()
    .withMessage("password no puede estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("password debe tener maximo 100 caracteres")
    .bail()
    .custom((password) => {
      if (password.includes(" ")) {
        throw new Error("password no puede tener espacios");
      }
      return true;
    }),
];

export const updateUserValidations = [
  ...userIdValidation,
  body("name")
    .optional()
    .isString()
    .withMessage("name debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("name no puede estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("name debe tener maximo 100 caracteres"),
  body("email")
    .optional()
    .isString()
    .withMessage("email debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("email no puede estar vacio")
    .bail()
    .isEmail()
    .withMessage("email debe tener un formato valido")
    .bail()
    .isLength({ max: 100 })
    .withMessage("email debe tener maximo 100 caracteres")
    .bail()
    .custom(async (email, { req }) => {
      const existe = await User.findOne({ where: { email } });
      if (existe && existe.id !== Number(req.params.id)) {
        throw new Error("Ese email ya existe");
      }
    }),
  body("password")
    .optional()
    .isString()
    .withMessage("password debe ser texto")
    .bail()
    .notEmpty()
    .withMessage("password no puede estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("password debe tener maximo 100 caracteres")
    .bail()
    .custom((password) => {
      if (password.includes(" ")) {
        throw new Error("password no puede tener espacios");
      }
      return true;
    }),
];
