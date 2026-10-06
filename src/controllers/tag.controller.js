import Tag from "../models/tag.models.js";
import Task from "../models/task.models.js";

export const createTag = async (req, res) => {
  try {
    const { name, taskIds } = req.body || {};

    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      name.length > 50
    ) {
      return res.status(400).json({
        message: "name es obligatorio y debe tener maximo de 50 caracteres",
      });
    }

    if (taskIds !== undefined) {
      if (
        !Array.isArray(taskIds) ||
        !taskIds.every((id) => Number.isInteger(id))
      ) {
        return res.status(400).json({
          message: "taskIds debe ser una lista de numeros enteros",
        });
      }
    }

    const existeTag = await Tag.findOne({ where: { name: name.trim() } });
    if (existeTag) {
      return res.status(400).json({
        message: "Tag existente",
      });
    }

    const idsUnicos = [...new Set(taskIds || [])];

    for (const id of idsUnicos) {
      const existeTask = await Task.findByPk(id);
      if (!existeTask) {
        return res.status(404).json({
          message: `La tarea con id ${id} no existe`,
        });
      }
    }

    const nuevoTag = await Tag.create({ name: name.trim() });

    await nuevoTag.addTasks(idsUnicos);

    return res.status(201).json({
      message: "Tag creado exitosamente",
      data: nuevoTag,
    });
  } catch (error) {
    console.error("Error al crear el tag:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Task,
          attributes: ["id", "title", "isComplete"],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({
      message: "Tags obtenidos exitosamente",
      data: tags,
    });
  } catch (error) {
    console.error("Error al obtener los tags:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
