import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/tags", tagRoutes);

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

iniciarServidor();
