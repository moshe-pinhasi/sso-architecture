const jwt = require('jsonwebtoken')
const secret = 'secretToken'

const removedTokens = []

const options = {
}

const sign = (user) => new Promise((resolve, reject) => {
  // the token is now a combination of the creation date and the user name
  const key = {user, loggedInAt: Date.now()}
  
  jwt.sign(key, secret, options, (err, decoded) => {
    if (err) reject(err)
    else resolve(decoded)
  })
})

const verify = (token) => new Promise((resolve, reject) => {
  if (removedTokens.includes(token)) throw 'invalid token'
  jwt.verify(token, secret, options, (err, token) => {
    if (err) reject(err)
    else resolve(token)
  })
})

function removeToken(token) {
  removedTokens.push(token)
}
module.exports = {
  sign,
  verify,
  removeToken
}