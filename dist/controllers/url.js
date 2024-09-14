"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAnalytics = exports.handleGenerateShortUrl = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const url_1 = __importDefault(require("../models/url"));
const url_2 = __importDefault(require("../models/url"));
const handleGenerateShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body.url)
        return yield res.status(400).json({ message: "url is required!" });
    const uuidGen = new short_unique_id_1.default({ length: 8 });
    const shortId = uuidGen.randomUUID();
    url_1.default.create({
        shortId,
        redirectUrl: body.url,
        visitHistory: []
    });
    return res.json({ id: shortId });
});
exports.handleGenerateShortUrl = handleGenerateShortUrl;
const handleGetAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortId = req.params.shortId;
    const foundUrl = yield url_2.default.findOne({ shortId });
    if (foundUrl)
        return res.json({
            totalClicks: foundUrl.visitHistory.length,
            analytics: foundUrl.visitHistory
        });
    return res.status(404).json({ message: "Invalid Short id provided" });
});
exports.handleGetAnalytics = handleGetAnalytics;
