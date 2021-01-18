const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieSession = require('cookie-session')

const {requireAuth}  = require('./middlewares/requireAuth.middleware')

const app = express()
const http = require('http').createServer(app);

app.use(bodyParser.json());
// Express App Config

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3030', 'http://localhost:3030'],
        credentials: false
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
