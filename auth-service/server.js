const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

// TODO: need to use "cookie-session"
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);

const authRoutes = require('./api/auth/auth.routes')

// Express App Config
app.use(bodyParser.json());

// TODO: need to use "cookie-session"
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3031', 'http://localhost:3032'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use(express.static('public'));

// login page
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('Auth Server is running on port: ' + port)
});
