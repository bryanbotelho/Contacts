import { Router } from "express";
import ContactController  from "../controllers/contact";

const router = Router();
router.post("/", (req, res) => ContactController.create(req, res));

export default router;