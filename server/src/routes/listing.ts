import { Router } from "express";
import {
  addListing,
  deleteListing,
  getAllListing,
  getUserListing,
  updateListing,
} from "../controllers/listing";
import {
  authenticateToken,
  checkAdminRole,
  checkUserRole,
} from "../middlewares/auth";

const router = Router();

router.get("/", authenticateToken, checkAdminRole, getAllListing);
router.post("/", authenticateToken, checkAdminRole, addListing);
router.patch("/", authenticateToken, checkAdminRole, updateListing);
router.delete("/:id", authenticateToken, checkAdminRole, deleteListing);
router.get("/get", authenticateToken, checkUserRole, getUserListing);
export default router;
