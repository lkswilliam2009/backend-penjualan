import { Request, Response, NextFunction } from "express";
import { ReportService } from "../services/report.service";

export class ReportController {

    static topCustomers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const limit = Number(req.query.limit) || 5;
            const data = await ReportService.topCustomers(limit);

            res.json({
                report: "Customer dengan pembelian terbanyak",
                data
            });
        } catch (error) {
            next(error);
        }
    };

    static stockReport = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await ReportService.stockReport();

            res.json({
                report: "Laporan stock",
                data
            });
        } catch (error) {
            next(error);
        }
    };

    static avgSoldPerMonth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await ReportService.avgProductSoldPerMonth();

            res.json({
                report: "Rata-rata produk terjual per bulan",
                data
            });
        } catch (error) {
            next(error);
        }
    };
}
