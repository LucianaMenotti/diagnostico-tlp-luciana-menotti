import Tag from "../models/tag.models.js";
import Task from "../models/task.models.js";

export const createTag = async (req, res) => {
  try {
    const { name, taskIds } = req.body;

    const idsUnicos = [...new Set(taskIds || [])];

    const nuevoTag = await Tag.create({ name });

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
