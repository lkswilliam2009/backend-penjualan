import { Router } from "express";
import { ExternalController } from "../controllers/external.controller";

const router = Router();
router.get("/products/fetch", ExternalController.fetchAndStore);
export default router;