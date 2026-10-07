import { matchedData } from "express-validator";
import UserProfile from "../models/userProfile.models.js";
import User from "../models/user.models.js";

export const createProfile = async (req, res) => {
  try {
    const { fullName, phone, bio, userId } = req.body;

    const nuevoPerfil = await UserProfile.create({
      fullName,
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

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = matchedData(req, { locations: ["body"] });

    const perfil = await UserProfile.findByPk(id);

    await perfil.update(datos);

    return res.status(200).json({
      message: "Perfil actualizado exitosamente",
      data: perfil,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const perfil = await UserProfile.findByPk(id);

    await perfil.destroy();

    return res.status(200).json({
      message: "Perfil eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el perfil:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
