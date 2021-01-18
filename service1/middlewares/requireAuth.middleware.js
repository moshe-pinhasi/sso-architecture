const axios = require("axios")

const redirectLink = 'http://localhost:3030'

async function requireAuth(req, res, next) {
  const {token} = req.query
  if (token) {
    try {
      const {user} = await _verifyToken(token)
      req.session.user = user;
      next();
    } catch (err) {
      // in case token expired / missing / malformed
      const referer = `${req.headers.host}/${req.baseUrl}`
      console.log('service 1 refering to', referer)
      req.session.user = null;
      return res.redirect(`${redirectLink}?referer=${referer}`)
    }
  }
}

async function _verifyToken(token)  {
    const url = `${redirectLink}/api/auth/verify/${token}`
      const response = await axios.get(url)
      console.log(response.data)
      return response.data
}

module.exports = {
  requireAuth,
}
