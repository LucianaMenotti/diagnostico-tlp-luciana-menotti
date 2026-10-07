import { matchedData } from "express-validator";
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

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, taskIds } = matchedData(req, { locations: ["body"] });

    const tag = await Tag.findByPk(id);

    if (name !== undefined) {
      await tag.update({ name });
    }

    if (taskIds !== undefined) {
      await tag.setTasks([...new Set(taskIds)]);
    }

    const tagActualizado = await Tag.findByPk(id, {
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
      message: "Tag actualizado exitosamente",
      data: tagActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el tag:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    await tag.destroy();

    return res.status(200).json({
      message: "Tag eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el tag:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
