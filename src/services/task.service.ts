import { db } from "../config/database";

export class TaskService {

    static async createTask(name: string, payload: string, runAt: string) {
        await db.query(
            "INSERT INTO tasks (name, payload, run_at) VALUES (?, ?, ?)",
            [name, payload, runAt]
        );
    }

    static async getDueTasks() {
        const [rows]: any = await db.query(
            `SELECT * FROM tasks 
             WHERE status = 'PENDING' 
             AND run_at <= NOW() 
             LIMIT 5`
        );
        return rows;
    }

    static async markRunning(id: number) {
        await db.query(
            "UPDATE tasks SET status = 'RUNNING' WHERE id = ?",
            [id]
        );
    }

    static async markDone(id: number) {
        await db.query(
            "UPDATE tasks SET status = 'DONE' WHERE id = ?",
            [id]
        );
    }

    static async markFailed(id: number, error: string) {
        await db.query(
            "UPDATE tasks SET status = 'FAILED', last_error = ? WHERE id = ?",
            [error, id]
        );
    }
}
