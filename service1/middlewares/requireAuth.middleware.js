const axios = require("axios")

const redirectLink = 'http://localhost:3030/'
const SERVICE_NAME = 'service-1'

async function requireAuth(req, res, next) {
  // get the token from the session OR the query
  const sessionToken = req.session.token
  const queryToken = req.query.token
  const token = sessionToken || queryToken
  try {
    const {user} = await _verifyToken(token)
    req.session.user = user;
    req.session.token = token;
    return next();
  } catch (err) { // in case token expired / missing / malformed we want to keep going
    console.log(`${SERVICE_NAME} - invalid token!`)
    req.session = null;

    const protocol = req.secure ? 'https://' : 'http://'
    const {search, pathname} = req._parsedUrl

    const url = new URL(`${protocol}${req.headers.host}`)
    if (pathname) url.pathname = pathname
    if (search) url.search = search
    
    const backTo = encodeURIComponent(url.toString())
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
