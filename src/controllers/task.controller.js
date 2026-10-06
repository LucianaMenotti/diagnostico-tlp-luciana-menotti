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

// GET /api/tasks: Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
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

// GET /api/tasks/:id: Obtener una tarea por su ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

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

// PUT /api/tasks/:id: Actualizar una tarea por su ID
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body || {};

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        title.trim() === "" ||
        title.length > 100
      ) {
        return res.status(400).json({
          message:
            "title debe ser texto no vacio y tener maximo de 100 caracteres",
        });
      }

      const existeTitle = await Task.findOne({
        where: { title: title.trim() },
      });
      if (existeTitle && existeTitle.id !== task.id) {
        return res.status(400).json({
          message: "Title existente",
        });
      }

      task.title = title.trim();
    }

    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        description.trim() === "" ||
        description.length > 100
      ) {
        return res.status(400).json({
          message:
            "description debe ser texto no vacio y tener maximo de 100 caracteres",
        });
      }

      task.description = description.trim();
    }

    if (isComplete !== undefined) {
      if (typeof isComplete !== "boolean") {
        return res.status(400).json({
          message: "isComplete debe tener un valor booleano",
        });
      }

      task.isComplete = isComplete;
    }

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

// DELETE /api/tasks/:id: Eliminar una tarea por su ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

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
