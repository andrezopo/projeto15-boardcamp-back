import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomerById,
} from "../controllers/customersController.js";
import customerValidation from "../middlewares/customerValidation.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.put("/customers/:id", updateCustomerById);
router.post("/customers", customerValidation, createCustomer);

export default router;
