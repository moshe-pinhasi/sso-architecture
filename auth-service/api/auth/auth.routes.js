const express = require('express')
const {login, verifyToken, logout} = require('./auth.controller')
const router = express.Router()

router.post('/login', login)
router.get('/verify/:token', verifyToken)
router.get('/logout', logout)

module.exports = router