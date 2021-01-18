const authService = require('./auth.service')


async function login(req, res) {
    const { redirect, email, password } = req.body
    try {
        const { user, token } = await authService.login(email, password)
        
        req.session.user = user;
        req.session.token = token;
        
        res.json({ redirect: decodeURIComponent(redirect) , token })
    } catch (err) {
        res.status(401).send({ error: err })
    }
}



async function verifyToken(req, res) {
    try {
        const { token } = req.params
        if (!token) throw 'token error'
        console.log('before varifying token', token)
        const response = await authService.verifyJWT(token)
        res.send(response)
    } catch (err) {
        res.status(401).send('token error')
    }

}

module.exports = {
    login,
    verifyToken
}