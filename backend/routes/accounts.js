import { Router } from "express";
import accountController from "../controller/accounts.js";

const router = Router();
router.post('/add', accountController.addLog);
router.get('/get', accountController.getLogs);

export default router;