import { Router } from "express";
import {
  createService,
  getServices,
  updateService,
  deleteService
} from "../controllers/serviceController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = Router();

// All routes require admin token
router.post("/", verifyToken, createService);
router.get("/", verifyToken, getServices);
router.put("/:id", verifyToken, updateService);
router.delete("/:id", verifyToken, deleteService);

export default router;
