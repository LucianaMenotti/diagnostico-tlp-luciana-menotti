import Task from "../models/task.models.js";

// Validar los datos recibidos antes de añadir o editar una tarea:
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (
      !title ||
      typeof title !== "string" ||
      title.trim() === "" ||
      title.length > 100
    ) {
      return res.status(400).json({
        message: "title es obligatorio y debe tener maximo de 100 caracteres",
      });
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message:
          "descripcion es obligatorio y debe tener maximo de 100 caracteres",
      });
    }

    if (typeof isComplete !== "boolean") {
      return res.status(400).json({
        message: "isComplete debe tener un valor booleano",
      });
    }

    //title: Debe ser una cadena única en la base de datos
    const existeTitle = await Task.findOne({ where: { title: title.trim() } });
    if (existeTitle) {
      return res.status(400).json({
        message: "Title existente",
      });
    }

    //Creacion nuevo task
    const nuevoTask = await Task.create({
      title: title.trim(),
      description: description.trim(),
      isComplete,
    });

    return res.status(201).json({
      message: "Se creo exitosamente la nueva tarea",
      data: nuevoTask,
    });
  } catch (error) {
    console.error("Error al crear la tarea", error);
    return res.status(500).json({
      message: "error interno",
    });
  }
};
