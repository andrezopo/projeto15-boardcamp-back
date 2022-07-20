import { Router } from "express";
import { createGame, getGames } from "../controllers/gamesController.js";

const router = Router();

router.get("/games", getGames);

router.post("/games", createGame);

export default router;
