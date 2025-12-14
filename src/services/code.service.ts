import { db } from "../config/database";
import { padNumber } from "../utils/format";

export class CodeService {
    static async generateInvoiceCode(connection: any) {
        // LOCK row running number
        const [rows]: any = await connection.query(
            "SELECT last_number FROM running_numbers WHERE id = 1 FOR UPDATE"
        );

        const last = rows[0].last_number;
        const next = last + 1;

        const code = `INV-${padNumber(next)}`;

        // Update running number
        await connection.query(
            "UPDATE running_numbers SET last_number = ? WHERE id = 1",
            [next]
        );

        return code;
    }
}