import { Router } from "express";
import userRouter from "./api/user.js";
import authRouter from "./api/auth.js";
import appointmentRouter from "./api/appointment.js";
import employeeHoursRouter from "./api/employee-hours.js"; // ✅ NEW

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(appointmentRouter);
router.use(employeeHoursRouter); // ✅ NEW

export default router;
