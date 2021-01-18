const tokenService = require('../services/token.service')

async function fetchSessionToken(req, res, next) {
    const { token } = req.session
    const redirect = req.query.redirect
    if (!token || !redirect) return next()

    try {
        await tokenService.verify(token);
        const redirectUrl = new URL(decodeURIComponent(redirect))
        redirectUrl.searchParams.append('token',token)
        res.redirect(redirectUrl.toString())
    } catch (err) { // in case token expired / missing / malformed we want to keep going
        console.log('FetchSessionToken::error', err)
        next()
    }
}

module.exports = {
    fetchSessionToken,
}
