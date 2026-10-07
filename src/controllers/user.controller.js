import User from "../models/user.models.js";
import Task from "../models/task.models.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const nuevoUser = await User.create({ name, email, password });

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

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          attributes: ["id", "title", "description", "isComplete"],
        },
      ],
    });

    return res.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      data: users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          attributes: ["id", "title", "description", "isComplete"],
        },
      ],
    });

    return res.status(200).json({
      message: "Usuario obtenido exitosamente",
      data: user,
    });
  } catch (error) {
    console.error("Error al obtener usuario", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body ?? {};

    const user = await User.findByPk(id);

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = password;

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

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar usuario", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
