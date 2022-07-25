import { Router } from "express";
import { createGame, getGames } from "../controllers/gamesController.js";
import gamesValidation from "../middlewares/gamesValidation.js";

const router = Router();

router.get("/games", getGames);

router.post("/games", gamesValidation, createGame);

export default router;
