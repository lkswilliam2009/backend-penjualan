import { Router } from "express";
import { CodeController } from "../controllers/code.controller";

const router = Router();
router.post("/invoice", CodeController.createInvoice);
export default router;