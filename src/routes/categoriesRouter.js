import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoriesController.js";

const router = Router();

router.get("/categories", getCategories);

router.post("/categories", createCategory);

export default router;
