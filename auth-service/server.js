const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieSession = require('cookie-session')
const tokenService = require('./services/token.service')
const { fetchSessionToken } = require('./middlewares/fetchSessionToken.middleware')
const authRoutes = require('./api/auth/auth.routes')

const app = express()
const http = require('http').createServer(app);

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3031', 'http://localhost:3032', 'http://localhost:3031', 'http://127.0.0.1:3031'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use(express.static('public'));

app.get('/logout', async(req,res) => {
    try {
        const {token} = req.session
        if (token) await tokenService.removeToken(token)
        req.session = null
        res.redirect('/login')
    } catch (err) {
        console.log('error logging out', err)
        res.status(500).send('error')
    }
})

app.get('/login', fetchSessionToken, (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/404', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
})

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('Auth Server is running on port: ' + port)
});
