const { default: axios } = require("axios")

const redirectLink = 'http://localhost:3030'


async function requireAuth(req, res, next) {
  const {token} = req.query
  if (token) {
    try {
      const {user} = await _verifyToken(token)
      req.session.user = user;
    } catch (err) {
      // in case token expired / missing / malformed
    }
  }

  if (!req.session || !req.session.user) {
    const referer = `${req.headers.host}/${req.baseUrl}`
    console.log('service 1 refering to', referer)
    return res.redirect(`${redirectLink}?referer=${referer}`)
  }
  console.log(req.session)
  next();
}

async function _verifyToken(token)  {
    const url = `${redirectLink}/api/auth/verify/${token}`
      const response = await axios.get(url)
      console.log(response.data)
      return response.data


}


// module.exports = requireAuth;

module.exports = {
  requireAuth,

}
