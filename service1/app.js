const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const {requireAuth}  = require('./middlewares/requireAuth.middleware')

const app = express()
const http = require('http').createServer(app);

// Express App Config

app.use(cookieParser())
app.use(bodyParser.json());
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
        origin: ['http://127.0.0.1:3030', 'http://localhost:3030', 'http://127.0.0.1:3000', 'http://localhost:3000','http://127.0.0.1:4200', 'http://localhost:4200'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// app.use(express.static('public'));
app.get('/index.js', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.js'));
})
app.get('/**', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// const logger = require('./services/logger.service')
const port = process.env.PORT || 3031;

http.listen(port, () => {
    console.log('Server is running on port: ' + port)
    if (process.env.NODE_ENV !== 'production') {
        console.log('service 1')
    }
});
