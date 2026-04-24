import { Router } from "express";
import ContactController  from "../controllers/contact";

const router = Router();
router.post("/", (req, res) => ContactController.create(req, res));
router.put("/:id", (req, res) => ContactController.update(req, res));

export default router;