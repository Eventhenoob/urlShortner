import ShortUniqueId from 'short-unique-id';
import URL from '../models/url';
import url from '../models/url';
export const handleGenerateShortUrl = async (req: any, res: any) => {
    const body = req.body;

    if (!body.url) return await res.status(400).json({ message: "url is required!" });
    const uuidGen = new ShortUniqueId({ length: 8 });
    const shortId = uuidGen.randomUUID()
URL.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: []
})
return res.json({ id: shortId })
}

export const handleGetAnalytics = async (req: any, res: any) => {
    const shortId = req.params.shortId;
    const foundUrl = await url.findOne({ shortId });

    if (foundUrl) return res.json(
        {
            totalClicks: foundUrl.visitHistory.length,
            analytics: foundUrl.visitHistory
        });

    return res.status(404).json({ message: "Invalid Short id provided" })
}

