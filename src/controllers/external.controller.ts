import { Request, Response, NextFunction } from "express";
import { ExternalService } from "../services/external.service";

export class ExternalController {

    static fetchAndStore = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await ExternalService.fetchProductsAndSave();

            return res.json({
                message: "Products fetched and stored successfully",
                total: products.length,
                products
            });
        } catch (error) {
            next(error);
        }
    };

}
