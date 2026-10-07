import { body } from "express-validator";
import User from "../models/user.models.js";
import UserProfile from "../models/userProfile.models.js";

export const createProfileValidations = [
  body("fullName")
    .isString()
    .withMessage("fullName es obligatorio y debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("fullName no puede estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("fullName debe tener maximo 100 caracteres"),
  body("phone")
    .optional()
    .isString()
    .withMessage("phone debe ser texto")
    .bail()
    .isLength({ max: 30 })
    .withMessage("phone debe tener maximo 30 caracteres")
    .bail()
    .custom((phone) => {
      if (!/^[0-9+\- ]+$/.test(phone)) {
        throw new Error("phone solo puede tener numeros, espacios, + y -");
      }
      return true;
    }),
  body("bio")
    .optional()
    .isString()
    .withMessage("bio debe ser texto")
    .bail()
    .isLength({ max: 255 })
    .withMessage("bio debe tener maximo 255 caracteres"),
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
    })
    .bail()
    .custom(async (userId) => {
      const perfil = await UserProfile.findOne({ where: { userId } });
      if (perfil) {
        throw new Error("Ese usuario ya tiene un perfil");
      }
    }),
];
