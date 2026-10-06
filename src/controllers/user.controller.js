import User from "../models/user.models.js";

// POST /api/users: Crear un nuevo usuario.
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
      email.trim() === "" ||
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
      password.trim() === "" ||
      password.length > 100
    ) {
      return res.status(400).json({
        message:
          "password es obligatorio, debe ser texto y debe tener maximo 100 caracteres",
      });
    }

    const existeUser = await User.findOne({ where: { email: email.trim() } });
    if (existeUser) {
      return res.status(400).json({
        message: "Ese email ya existe",
      });
    }

    const nuevoUser = await User.create({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    return res.status(201).json({
      message: "Usuario creado exitosamente",
      data: nuevoUser,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor al crear usuario",
    });
  }
};

// GET /api/users: Obtener todos los usuarios.
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      data: users,
    });
  } catch (error) {
    console.error("error al obtener usuarios", error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};

// GET /api/users/:id: Obtener un usuario específico por su ID.
export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "usuario obtenido exitosamente",
      data: user,
    });
  } catch (error) {
    console.error("error al obtener usuario", error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};

// PUT /api/users/:id: Actualizar un usuario específico por su ID.
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body || {};

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "" || name.length > 100) {
        return res.status(400).json({
          message:
            "name debe ser texto no vacio y tener maximo de 100 caracteres",
        });
      }

      user.name = name.trim();
    }

    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        email.trim() === "" ||
        email.length > 100
      ) {
        return res.status(400).json({
          message:
            "email debe ser texto no vacio y tener maximo de 100 caracteres",
        });
      }

      const existeEmail = await User.findOne({
        where: { email: email.trim() },
      });
      if (existeEmail && existeEmail.id !== user.id) {
        return res.status(400).json({
          message: "Ese email ya existe",
        });
      }

      user.email = email.trim();
    }

    if (password !== undefined) {
      if (
        typeof password !== "string" ||
        password.trim() === "" ||
        password.length > 100
      ) {
        return res.status(400).json({
          message:
            "password debe ser texto no vacio y tener maximo de 100 caracteres",
        });
      }

      user.password = password;
    }

    await user.save();

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      data: user,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// DELETE /api/users/:id: Eliminar un usuario específico por su ID.
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("error al eliminar usuario", error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};
