const jwt = require('jsonwebtoken')
const secret = 'secretToken'


const options = {
}

const sign = (user) => new Promise((resolve, reject) => {
  jwt.sign(user, secret, options, (err, decoded) => {
    if (err) reject(err)
    else resolve(decoded)
  })
})

const verify = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, options, (err, token) => {
    if (err) reject(err)
    else resolve(token)
  })
})

module.exports = {
  sign,
  verify
}