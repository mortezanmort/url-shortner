import express from "express";
const router = express.Router();

import { getUserURLs } from "../controllers/user";
import { authMiddleware, requireSignin } from "../controllers/auth";

router.get("/urls", requireSignin, authMiddleware, getUserURLs);

export default router;
