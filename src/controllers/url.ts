import ShortUniqueId from 'short-unique-id';
import URL from '../models/url';
export const handleGenerateShortUrl = async (req: any, res: any) => {
    const body = req.body;
    if (body.url) return await res.status(400).json({ message: "url is required!" });
    const shortId = new ShortUniqueId({ length: 8 });
    URL.create({
        shortId: shortId.rnd(),
        redirectUrl: body.url,
        visitHistory: []
    })
    return res.json({ id: shortId })
}


