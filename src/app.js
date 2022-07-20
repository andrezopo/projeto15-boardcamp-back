import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gamesRouter from "./routes/gamesRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import customersRouter from "./routes/customersRouter.js";
import rentalRouter from "./routes/rentalsRouter.js";

dotenv.config();

const app = express();

app.use([cors(), express.json()]);

app.use([categoriesRouter, gamesRouter, customersRouter, rentalRouter]);

app.listen(process.env.PORT, () => {
  console.log(`Servidor tocando na porta ${process.env.PORT}`);
});
