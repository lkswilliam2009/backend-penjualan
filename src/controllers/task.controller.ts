import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {

    static createTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, payload, run_at } = req.body;

            if (!name || !run_at) {
                return res.status(400).json({ message: "Invalid payload" });
            }

            await TaskService.createTask(name, payload, run_at);

            return res.json({ message: "Task scheduled successfully" });
        } catch (error) {
            next(error);
        }
    };

}
