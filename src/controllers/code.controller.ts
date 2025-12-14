import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { CodeService } from "../services/code.service";

export class CodeController {
    static createInvoice = async (req: Request, res: Response, next: NextFunction) => {
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const { description } = req.body;

            // Generate kode unik aman race-condition
            const kode = await CodeService.generateInvoiceCode(connection);

            // insert data
            await connection.query(
                "INSERT INTO invoices (kode, description) VALUES (?, ?)",
                [kode, description]
            );

            await connection.commit();
            connection.release();

            return res.json({
                message: "Invoice created",
                kode
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            next(error);
        }
    };
}