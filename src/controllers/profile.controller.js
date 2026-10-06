import UserProfile from "../models/userProfile.models.js";
import User from "../models/user.models.js";

export const createProfile = async (req, res) => {
  try {
    const { fullName, phone, bio, userId } = req.body || {};

    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim() === "" ||
      fullName.length > 100
    ) {
      return res.status(400).json({
        message:
          "fullName es obligatorio y debe tener maximo de 100 caracteres",
      });
    }

    if (
      phone !== undefined &&
      (typeof phone !== "string" || phone.length > 30)
    ) {
      return res.status(400).json({
        message: "phone debe ser texto y tener maximo de 30 caracteres",
      });
    }

    if (bio !== undefined && (typeof bio !== "string" || bio.length > 255)) {
      return res.status(400).json({
        message: "bio debe ser texto y tener maximo de 255 caracteres",
      });
    }

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        message: "userId es obligatorio y debe ser un numero entero",
      });
    }

    const existeUser = await User.findByPk(userId);
    if (!existeUser) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const existePerfil = await UserProfile.findOne({ where: { userId } });
    if (existePerfil) {
      return res.status(400).json({
        message: "Ese usuario ya tiene un perfil",
      });
    }

    const nuevoPerfil = await UserProfile.create({
      fullName: fullName.trim(),
      phone,
      bio,
      userId,
    });

    return res.status(201).json({
      message: "Perfil creado exitosamente",
      data: nuevoPerfil,
    });
  } catch (error) {
    console.error("Error al crear el perfil:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.findAll({
      attributes: ["id", "fullName", "phone", "bio"],
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    return res.status(200).json({
      message: "Perfiles obtenidos exitosamente",
      data: profiles,
    });
  } catch (error) {
    console.error("Error al obtener los perfiles:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
