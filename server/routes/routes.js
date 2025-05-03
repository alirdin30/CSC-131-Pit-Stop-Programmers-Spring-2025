import { Router } from "express";
import userRouter from "./api/user.js";
import authRouter from "./api/auth.js";
import appointmentRouter from "./api/appointment.js";
import serviceRouter from "./api/service.js";
import hoursRouter from "./api/hours.js"; // ESM import for hoursRouter

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(appointmentRouter);
router.use('/api/services', serviceRouter);
router.use('/api/hours', hoursRouter); // Added for clock-in/out

export default router;
