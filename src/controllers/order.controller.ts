import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {

    static createOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_id, items } = req.body;

            if (!user_id || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "Invalid payload" });
            }

            const orderId = await OrderService.createOrder(user_id, items);

            res.json({
                message: "Order created successfully",
                order_id: orderId
            });
        } catch (error) {
            next(error);
        }
    };
}
