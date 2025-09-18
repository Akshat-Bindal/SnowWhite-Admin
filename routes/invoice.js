import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", createInvoice);         
router.get("/", getInvoices);         
router.get("/:id", getInvoiceById);       
router.patch("/:id/status", updateInvoiceStatus); 
router.delete("/:id", deleteInvoice);   

export default router;
