import express from "express";
const router = express.Router();

import { generateURL, updateSlug, getSlugById } from "../controllers/url";
import { authMiddleware, requireSignin } from "../controllers/auth";
import { limiter } from "../middlewares/rateLimiter";

router.post("/", requireSignin, authMiddleware, limiter, generateURL);
router.put("/update/:id", requireSignin, authMiddleware, updateSlug);
router.get("/:id", requireSignin, authMiddleware, getSlugById);

export default router;
