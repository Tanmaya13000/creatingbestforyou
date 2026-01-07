import { Router } from "express";
import { createContactFormEntry } from "../Controllers/ContactForm.controller.js";

const router = Router();

router.post("/contact", createContactFormEntry);

export default router;
