import { Router } from "express";
import { get_Mpesa_logs, makePayment, mpesa_callback } from "../controllers/StkControllers";
import { authenticateToken } from "../middleware/authMiddleware";


const router = Router();
router.post("/pay", authenticateToken, makePayment);
router.post("/mpesa-callback", mpesa_callback);
router.get("/mpesa-logs",authenticateToken, get_Mpesa_logs);
export default router;
