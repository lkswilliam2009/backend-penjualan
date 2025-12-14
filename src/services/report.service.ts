import { db } from "../config/database";

export class ReportService {

    // a. Customer dengan pembelian terbanyak
    static async topCustomers(limit: number) {
        const [rows]: any = await db.query(
            `
            SELECT 
                c.id,
                c.name,
                SUM(o.total) AS total_pembelian
            FROM customers c
            JOIN orders o ON o.customer_id = c.id
            GROUP BY c.id, c.name
            ORDER BY total_pembelian DESC
            LIMIT ?
            `,
            [limit]
        );
        return rows;
    }

    // c. Laporan stock
    static async stockReport() {
        const [rows]: any = await db.query(
            `
            SELECT 
                id,
                name,
                stock,
                CASE
                    WHEN stock = 0 THEN 'OUT_OF_STOCK'
                    WHEN stock < 10 THEN 'LOW_STOCK'
                    ELSE 'AVAILABLE'
                END AS status
            FROM products
            `
        );
        return rows;
    }

    // e. Rata-rata produk terjual per bulan
    static async avgProductSoldPerMonth() {
        const [rows]: any = await db.query(
            `
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') AS bulan,
                AVG(qty) AS rata_rata_terjual
            FROM order_items
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY bulan
            `
        );
        return rows;
    }
}
