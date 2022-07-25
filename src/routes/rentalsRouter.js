import { Router } from "express";
import {
  createRental,
  deleteRentalById,
  getRentals,
  returnRentalById,
} from "../controllers/rentalsController.js";
import rentalIdValidation from "../middlewares/rentalIdValidation.js";
import rentalValidation from "../middlewares/rentalValidation.js";

const router = Router();

router.get("/rentals", getRentals);
router.delete("/rentals/:id", rentalIdValidation, deleteRentalById);
router.post("/rentals/:id/return", rentalIdValidation, returnRentalById);
router.post("/rentals", rentalValidation, createRental);

export default router;
