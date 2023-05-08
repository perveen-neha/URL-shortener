const {nanoid} = require('nanoid')
const URL = require('../models/url')

async function HandleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "url required"})

    const shortID = nanoid(8);
    await URL.create({
        shortID : shortID,
        redirectURL : body.url,
        visitHistory : [],
        createdAt : req.user._id
    })

    return res.render('home', {
        id : shortID
    });
}

async function HandleGetAnalytics(req,res) {
    const shortId = req.params.shortID;
    const result = await URL.findOne({shortID : shortId});
    return res.json({
        totalClicks : result.visitHistory.length,
        Analytics : result.visitHistory
    })
}

module.exports = {
    HandleGenerateNewShortUrl,
    HandleGetAnalytics
}