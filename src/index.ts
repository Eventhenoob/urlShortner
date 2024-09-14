import express from "express";
import urlRouter from "./routes/url"
import { connectDb } from "./utils/connect";
import url from "./models/url";
const app = express();
app.use(express.json());
const port = 8001;

app.use("/url", urlRouter);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const foundUrl = await url.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() },
        }
    })
    
    if (foundUrl) return res.redirect(foundUrl.redirectUrl);
    else res.status(404).json({ message: "Invalid shortId provided" });
})
connectDb();
app.listen(port, () => {
    console.log("hello from the server");
})


