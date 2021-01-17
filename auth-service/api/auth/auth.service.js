// const bcrypt = require('bcrypt')
// const userService = require('../user/user.service')
const { response } = require('express');
var jwt = require('jsonwebtoken');

// const saltRounds = 10

async function login(email, password) {

    if (!email || !password) return Promise.reject('email and password are required!')
    try {
        // TODO: CHECK HERE IF USER EXISTS
        // const user = await userService.getByEmail(email)
        // if (!user) return Promise.reject('Invalid email or password')
        // const match = await bcrypt.compare(password, user.password)
        // if (!match) return Promise.reject('Invalid email or password')
        const user = email
        const token = _getJWT(user)
        delete user.password;
        return { user, token };
    } catch (err) {
        console.log(err)
        throw err 
    }
    
}

async function signup(email, password, username) {
    // logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')

    // const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, username })
}

function _getJWT(user) {

    var token = jwt.sign({ user }, 'secretToken');
    return token
}

function verifyJWT(token) {

    var decoded = jwt.verify(token, 'secretToken');
    return decoded

}

module.exports = {
    signup,
    login,
    verifyJWT
}