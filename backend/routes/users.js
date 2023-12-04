import { Router } from "express";
import userController from "../controller/users";

const router = Router();
router.post('/add', userController.createUser);
router.get('/get', userController.getUsers);

export default router;