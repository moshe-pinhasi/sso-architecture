const axios = require("axios")

const redirectLink = 'http://localhost:3030'

async function requireAuth(req, res, next) {
  // get the token from the session OR the query
  let sessionToken = req.session.token
  let queryToken = req.query.token
  const token = sessionToken || queryToken

  if (token) {
    try {
      const {user} = await _verifyToken(token)
      req.session.user = user;
      req.session.token = token;
      return next();
    } catch (err) {
      console.log(err)
      // in case token expired / missing / malformed we want to keep going
    }
  }
  const protocol = req.secure ? 'https://' : 'http://'
  const referer = encodeURIComponent(`${protocol}${req.headers.host}/${req.baseUrl}`)
  
  req.session.user = null;
  return res.redirect(`${redirectLink}?redirect=${referer}`)
}

async function _verifyToken(token)  {
    const url = `${redirectLink}/api/auth/verify/${token}`
      const response = await axios.get(url)
      return response.data
}

module.exports = {
  requireAuth,
}
