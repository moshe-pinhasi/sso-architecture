const axios = require("axios")

const redirectLink = 'http://localhost:3030/'

async function requireAuth(req, res, next) {
  // get the token from the session OR the query
  let sessionToken = req.session.token
  let queryToken = req.query.token
  const token = sessionToken || queryToken
  console.log('token',token)
  if (token) {
    try {
      const {user} = await _verifyToken(token)
      console.log('user',user)
      req.session.user = user;
      req.session.token = token;
      return next();
    } catch (err) {
      // console.log(err)
      // in case token expired / missing / malformed we want to keep going
    }
  }
  
  const protocol = req.secure ? 'https://' : 'http://'
  // TODO: add support for entire path including query and hash
  const referer = encodeURIComponent(`${protocol}${req.headers.host}/${req.baseUrl}`)
  // TODO: req session destroy
  req.session.user = null;
  console.log('refering to 1',referer)
  res.redirect(`${redirectLink}login?redirect=${referer}`)
}

async function _verifyToken(token)  {
    const url = `${redirectLink}api/auth/verify/${token}`
    const response = await axios.get(url)
    console.log('url before varifying token', url)
      return response.data
}

module.exports = {
  requireAuth,
}
