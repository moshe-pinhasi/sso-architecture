const tokenService = require('../services/token.service')

async function fetchSessionToken(req, res, next) {
    const { token } = req.session
    console.log(token)
    if (token) {
        try {
            await tokenService.verify(token);
            const referer = decodeURIComponent(`${req.query.redirect}`)
            return res.redirect(referer)
        } catch (err) {
            console.log(err)
            // in case token expired / missing / malformed we want to keep going
        }
    }
    next()
}

module.exports = {
    fetchSessionToken,
}
