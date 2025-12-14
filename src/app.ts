import express from "express";
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

// global error handling
app.use(errorHandler);

export default app;