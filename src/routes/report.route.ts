import { Router } from "express";
import { ReportController } from "../controllers/report.controller";

const router = Router();

router.get("/top-customers", ReportController.topCustomers);
router.get("/stock", ReportController.stockReport);
router.get("/avg-sold-per-month", ReportController.avgSoldPerMonth);

export default router;
