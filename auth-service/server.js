const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieSession = require('cookie-session')
const { fetchSessionToken}  = require('./middlewares/fetchSessionToken.middleware')


const app = express()
const http = require('http').createServer(app);

const authRoutes = require('./api/auth/auth.routes')

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

// login page
app.get('/**', fetchSessionToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('Auth Server is running on port: ' + port)
});
