const tokenService = require('../../services/token.service')

async function login(email, password) {
  if (!email || !password) return Promise.reject('email and password are required!')
  const user = email
  const token = await tokenService.sign(user)
  return { token };
}

async function verifyJWT(token) {
  const decoded = await tokenService.verify(token);
  return !!decoded
}

module.exports = {
    login,
    verifyJWT
}