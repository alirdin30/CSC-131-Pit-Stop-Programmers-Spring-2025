import { Router } from "express";
import userRouter from "./api/user.js";
import authRouter from "./api/auth.js";
import appointmentRouter from "./api/appointment.js";
import serviceRouter from "./api/service.js";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(appointmentRouter);
router.use('/api/services', serviceRouter);

export default router;
