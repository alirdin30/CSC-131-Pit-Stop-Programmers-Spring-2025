import { Router } from "express";
import userRouter from "./api/user.js";
import authRouter from "./api/auth.js";
import appointmentRouter from "./api/appointment.js";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(appointmentRouter);

export default router;