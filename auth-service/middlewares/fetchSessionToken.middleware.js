const tokenService = require('../services/token.service')

async function fetchSessionToken(req, res, next) {
    const { token } = req.session
    console.log('token',token)
    if (token) {
        try {
            await tokenService.verify(token);
            if (!req.query.redirect) return next()
            console.log('verified token, redirecting to', req.query.redirect)
            const referer = decodeURIComponent(req.query.redirect)
            console.log('referer',referer)
            return res.redirect(`${referer}?token=${token}`)
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
