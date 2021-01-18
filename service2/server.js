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
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use(requireAuth, express.static('public'));

app.get('/logout', (req,res) => {
    const redirectLink = 'http://localhost:3030/'
    res.redirect(`${redirectLink}api/auth/logout`)
})

// const logger = require('./services/logger.service')
const port = process.env.PORT || 3032;

http.listen(port, () => {
    console.log('Server2 is running on port: ' + port)
});
