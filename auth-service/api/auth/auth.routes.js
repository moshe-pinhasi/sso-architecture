const express = require('express')

const {login, verifyToken, signup, logout} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.get('/verify/:token', verifyToken)
// router.post('/signup', signup)
// router.post('/logout', requireAuth, logout)

module.exports = router