import { Router } from "express";
import {
  createRental,
  deleteRentalById,
  getRentals,
  returnRentalById,
} from "../controllers/rentalsController.js";

const router = Router();

router.get("/rentals", getRentals);
router.delete("/rentals/:id", deleteRentalById);
router.post("/rentals/:id/return", returnRentalById);
router.post("/rentals", createRental);

export default router;
