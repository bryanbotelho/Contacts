import { Router } from "express";
import ContactController  from "../controllers/contact";
import { authMiddleware } from '../middlewares/auth';

const router = Router();
router.post("/", authMiddleware, ContactController.create);
router.put("/:id",authMiddleware, ContactController.update);
router.get("/", ContactController.getContacts);
router.delete("/:id",authMiddleware, ContactController.delete);

export default router;