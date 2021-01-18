const authService = require('./auth.service')


async function login(req, res) {
    const { email, password } = req.body
    const { referer } = req.query
    try {
        // const user = await authService.login(email, password)
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
        if (!token) return res.status(401).send('token missing')
        const response = authService.verifyJWT(token)
        res.send(response)
    } catch {
        res.status(401).send('token error')
    }

}
// async function signup(req, res) {
//     try {
//         const { email, password, username } = req.body
//         const account = await authService.signup(email, password, username)
//         const user = await authService.login(email, password)
//         req.session.user = user
//         res.json(user)
//     } catch (err) {
//         console.error('[SIGNUP] ' + err)
//         res.status(500).send({ error: 'could not signup, please try later' })
//     }
// }

// async function logout(req, res){
//     try {
//         req.session.destroy()
//         res.send({ message: 'logged out successfully' })
//     } catch (err) {
//         res.status(500).send({ error: err })
//     }
// }

module.exports = {
    login,
    verifyToken
    // signup,
    // logout
}