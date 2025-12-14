import express from "express";
import authRoutes from "./routes/auth.route";
import codeRoutes from "./routes/code.route";
import externalRoutes from "./routes/external.route";
import taskRoutes from "./routes/task.route";
import orderRoutes from "./routes/order.route";
import reportRoutes from "./routes/report.route";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/code", codeRoutes);
app.use("/external", externalRoutes);
app.use("/tasks", taskRoutes);
app.use("/orders", orderRoutes);
app.use("/reports", reportRoutes);

// global error handling
app.use(errorHandler);

export default app;
