import Task from "../models/task.models.js";
import User from "../models/user.models.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, userId } = req.body;

    const nuevoTask = await Task.create({
      title,
      description,
      isComplete,
      userId,
    });

    return res.status(201).json({
      message: "Se creo exitosamente la nueva tarea",
      data: nuevoTask,
    });
  } catch (error) {
    console.error("Error al crear la tarea", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    return res.status(200).json({
      message: "Tareas obtenidas exitosamente",
      data: tasks,
    });
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id, {
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    return res.status(200).json({
      message: "Tarea obtenida exitosamente",
      data: task,
    });
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body ?? {};

    const task = await Task.findByPk(id);

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (isComplete !== undefined) task.isComplete = isComplete;

    await task.save();

    return res.status(200).json({
      message: "Tarea actualizada exitosamente",
      data: task,
    });
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    await task.destroy();

    return res.status(200).json({
      message: "Tarea eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
