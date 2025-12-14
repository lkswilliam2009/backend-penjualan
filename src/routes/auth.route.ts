import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/login/email", AuthController.loginWithEmail);
router.post("/login/username", AuthController.loginWithUsername);

export default router;
