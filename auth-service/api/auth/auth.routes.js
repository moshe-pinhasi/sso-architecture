const express = require('express')
const {login, verifyToken} = require('./auth.controller')
const router = express.Router()

router.post('/login', login)
router.get('/verify/:token', verifyToken)

module.exports = router