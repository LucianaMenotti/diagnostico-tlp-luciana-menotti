import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Task from "./task.models.js";

const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  },
);

//preguntar
const TaskTags = sequelize.define("TaskTags", {}, { timestamps: false });

Task.belongsToMany(Tag, {
  through: TaskTags,
  foreignKey: "taskId",
  otherKey: "tagId",
});
Tag.belongsToMany(Task, {
  through: TaskTags,
  foreignKey: "tagId",
  otherKey: "taskId",
});

export default Tag;
