import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Task from "./task.models.js";
import UserProfile from "./userProfile.models.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

//uno a muchos
User.hasMany(Task, { foreignKey: "userId" });
//Un usuario puede tener muvhas tareas, a esas tareas se le agrega un id para saber a que usuario pertenece cada tarea
Task.belongsTo(User, { foreignKey: "userId" });
// Cada tarea pertenece a un solo usuario.

//Es decir, Un usuario con varias tareas, pero cada tarea con un solo usuario.


//para userProfile
User.hasOne(UserProfile, {foreignKey:"userId"});
UserProfile.belongsTo(User, { foreignKey: "userId" });
//hasOne significa que un usuario tiene un solo perfil.

export default User;
