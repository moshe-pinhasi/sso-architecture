const axios = require("axios")

const redirectLink = 'http://localhost:3030/'
const SERVICE_NAME = 'service-1'

async function requireAuth(req, res, next) {
  // get the token from the session OR the query
  let sessionToken = req.session.token
  let queryToken = req.query.token
  const token = sessionToken || queryToken
  try {
    const {user} = await _verifyToken(token)
    req.session.user = user;
    req.session.token = token;
    return next();
  } catch (err) { // in case token expired / missing / malformed we want to keep going
    console.log(`${SERVICE_NAME} - invalid token!`)
    req.session = null;

    // TODO: add support for entire path including query and hash
    const protocol = req.secure ? 'https://' : 'http://'
    const backTo = encodeURIComponent(`${protocol}${req.headers.host}/${req.baseUrl}`)
    const redirectUrl = `${redirectLink}login?redirect=${backTo}`
    console.log(`${SERVICE_NAME} is redirecting to: `, redirectUrl)
    res.redirect(redirectUrl)
  }
}

async function _verifyToken(token)  {
    console.log(`${SERVICE_NAME} is varifying token...`)
    const url = `${redirectLink}api/auth/verify/${token}`
    const response = await axios.get(url)
    const user = response.data
    console.log(`${SERVICE_NAME}: token varified, current user: `, user)
    return user
}

module.exports = {
  requireAuth,
}
