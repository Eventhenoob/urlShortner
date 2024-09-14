import { Router } from "express";
import { handleGenerateShortUrl } from "../controllers/url";

const router = Router();

router.post("/", handleGenerateShortUrl)

export default router;