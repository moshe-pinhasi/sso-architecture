const authService = require('./auth.service')


async function login(req, res) {
    const { email, password } = req.body
    const { referer } = req.query
    try {
        const { user, token } = await authService.login(email, password)
        req.session.user = user;
        res.json({ referer, token })
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function verifyToken(req, res) {
    try {
        const { token } = req.params
        if (!token) throw 'token error'
        const response = authService.verifyJWT(token)
        res.send(response)
    } catch (err) {
        res.status(401).send('token error')
    }

}

module.exports = {
    login,
    verifyToken
}