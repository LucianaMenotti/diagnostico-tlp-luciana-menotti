import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  },
);
//El unique: true en userId es lo que hace que la relación sea uno a uno: dos perfiles no pueden apuntar al mismo usuario. fullName es obligatorio, y phone y bio son opcionales.

export default UserProfile;
