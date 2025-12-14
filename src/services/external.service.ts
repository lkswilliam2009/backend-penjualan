import { httpGet } from "../utils/http";
import { db } from "../config/database";

export class ExternalService {

    static async fetchProductsAndSave() {
        // 1. Panggil API eksternal
        const data = await httpGet("https://dummyjson.com/products");

        if (!data || !data.products) {
            throw new Error("Invalid response format from external API");
        }

        // 2. Simpan ke database (raw)
        for (const item of data.products) {
            await db.query(
                "INSERT INTO external_products (external_id, title, price) VALUES (?, ?, ?)",
                [item.id, item.title, item.price]
            );
        }

        return data.products;
    }

}
