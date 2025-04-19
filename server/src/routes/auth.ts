import { Router } from "express";
import { loginUser, getUsers } from "../controllers/auth";
import { authenticateToken, checkAdminRole } from "../middlewares/auth";

const router = Router();

router.post("/login", loginUser);
router.get("/users", authenticateToken, checkAdminRole, getUsers);
export default router;
