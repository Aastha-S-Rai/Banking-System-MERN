import { Router } from "express";
import accountController from "../controller/accounts";

const router = Router();
router.post('/add', accountController.addLog);
router.get('/get', accountController.getLogs);

export default router;