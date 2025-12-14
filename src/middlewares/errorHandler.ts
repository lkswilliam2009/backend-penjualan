import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("ERROR:", err);

    return res.status(500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
};
