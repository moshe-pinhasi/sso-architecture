const tokenService = require('../../services/token.service')

async function login(email, password) {
  if (!email || !password) return Promise.reject('email and password are required!')
    // Check here is email matches password

  const user = email
  const token = await tokenService.sign(user)
  console.log(token)
  return { user,token };
}

async function verifyJWT(token) {
  const decoded = await tokenService.verify(token);
  return {user:decoded}
}

module.exports = {
    login,
    verifyJWT
}