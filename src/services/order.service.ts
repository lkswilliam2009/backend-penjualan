import { db } from "../config/database";

export class OrderService {

    static async createOrder(
        userId: number,
        items: { product_id: number; qty: number; price: number }[]
    ) {
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // 1. Insert order
            const [orderResult]: any = await connection.query(
                "INSERT INTO orders (user_id, total) VALUES (?, ?)",
                [
                    userId,
                    items.reduce((sum, i) => sum + i.qty * i.price, 0)
                ]
            );

            const orderId = orderResult.insertId;

            // 2. Insert order items
            for (const item of items) {
                // cek stok
                const [rows]: any = await connection.query(
                    "SELECT stock FROM products WHERE id = ? FOR UPDATE",
                    [item.product_id]
                );

                if (rows.length === 0 || rows[0].stock < item.qty) {
                    throw new Error("Stock not sufficient");
                }

                await connection.query(
                    "INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)",
                    [orderId, item.product_id, item.qty, item.price]
                );

                // 3. Update stock
                await connection.query(
                    "UPDATE products SET stock = stock - ? WHERE id = ?",
                    [item.qty, item.product_id]
                );
            }

            await connection.commit();
            connection.release();

            return orderId;
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    }
}
