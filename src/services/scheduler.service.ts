import { TaskService } from "./task.service";

export class SchedulerService {

    static start() {
        setInterval(async () => {
            try {
                const tasks = await TaskService.getDueTasks();

                for (const task of tasks) {
                    try {
                        await TaskService.markRunning(task.id);

                        // SIMULASI eksekusi task
                        console.log("Executing task:", task.name, task.payload);

                        // task sukses
                        await TaskService.markDone(task.id);
                    } catch (err: any) {
                        await TaskService.markFailed(task.id, err.message);
                    }
                }
            } catch (error) {
                console.error("Scheduler error:", error);
            }
        }, 5000); // cek tiap 5 detik
    }

}
