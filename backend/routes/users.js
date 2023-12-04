import { Router } from "express";
import userController from "../controller/users.js";

const router = Router();
router.post('/add', userController.createUser);
router.get('/get', userController.getUsers);

export default router;