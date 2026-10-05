import User from "../models/user.models.js";

//Validar los datos recibidos antes de añadir o editar un usuario:
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      name.length > 100
    ) {
      return res.status(400).json({
        message:
          "name es obligatorio, debe ser texto y debe tener maximo de 100 caracteres",
      });
    }

    if (
      !email ||
      typeof email !== "string" ||
      email.trim() == "" ||
      email.length > 100
    ) {
      return res.status(400).json({
        message:
          "email es obligatorio, debe ser texto y debe tener maximo de 100 caracteres",
      });
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim() == "" ||
      password.length > 100
    ) {
      return res.status(400).json({
        message:
          "password es obligatorio, debe ser texto y debe tener maximo 100 caracteres",
      });
    }

    //email: Debe ser una cadena única en la base de datos
    const existeUser = await User.findOne({ where: { email: email.trim() } });
    if (existeUser) {
      return res.status(400).json({
        message: "Ese email ya existe",
      });
    }

    //Creacion de usuario nuevo
    const nuevoUser = await User.create({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    //Se le muestra un mensaje del que el usuario se creo correctamente
    return res.status(201).json({
      message: "Usuario creado exitosamente ",
      data: nuevoUser,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor al crear usuario",
    });
  }
};
