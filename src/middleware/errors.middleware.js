import { validationResult } from "express-validator";

export const validateErrors = (req, res, next) => {
  const errores = validationResult(req);

  if (errores.isEmpty()) {
    return next();
  }

  const lista = errores.array({ onlyFirstError: true }).map((error) => ({
    campo: error.path,
    mensaje: error.msg,
  }));

  const noExiste = lista.some((error) => error.mensaje.endsWith("no existe"));

  if (noExiste) {
    return res.status(404).json({
      message: "Recurso no encontrado",
      errors: lista,
    });
  }

  return res.status(400).json({
    message: "Error de validacion",
    errors: lista,
  });
};
