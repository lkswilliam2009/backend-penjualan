import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export class AuthController {

    // Login via email
    static loginWithEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const [rows]: any = await db.query(
                "SELECT * FROM users WHERE email = ? LIMIT 1",
                [email]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Email not found" });
            }

            const user = rows[0];

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = generateToken({ id: user.id });

            return res.json({ message: "Login success (email)", token });
        } catch (error) {
            next(error);
        }
    };

    // Login via username
    static loginWithUsername = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const [rows]: any = await db.query(
                "SELECT * FROM users WHERE username = ? LIMIT 1",
                [username]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Username not found" });
            }

            const user = rows[0];

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = generateToken({ id: user.id });

            return res.json({ message: "Login success (username)", token });
        } catch (error) {
            next(error);
        }
    };
}
