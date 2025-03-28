import { Router } from "express";
import userRouter from "./api/user.js";
import authRouter from "./api/auth.js";

const router = Router();

router.use(userRouter);
router.use(authRouter);

export default router;