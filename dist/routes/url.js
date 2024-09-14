"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_1 = require("../controllers/url");
const router = (0, express_1.Router)();
router.post("/", url_1.handleGenerateShortUrl);
exports.default = router;
