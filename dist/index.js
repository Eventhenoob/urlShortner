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
const express_1 = __importDefault(require("express"));
const url_1 = __importDefault(require("./routes/url"));
const connect_1 = require("./utils/connect");
const url_2 = __importDefault(require("./models/url"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8001;
app.use("/url", url_1.default);
app.get("/:shortId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortId = req.params.shortId;
    const foundUrl = yield url_2.default.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() },
        }
    });
    if (foundUrl)
        return res.redirect(foundUrl.redirectUrl);
    else
        res.status(404).json({ message: "Invalid shortId provided" });
}));
(0, connect_1.connectDb)();
app.listen(port, () => {
    console.log("hello from the server");
});
