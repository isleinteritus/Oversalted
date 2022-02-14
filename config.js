// variables \\
require('dotenv').config()
const { nanoid } = require('nanoid')
const IN_PROD = process.env.NODE_ENV === 'production'

const config = {

// database \\
MONGODB_URI: `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?${process.env.MONGO_OPTION}`,

MONGODB_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},

// cache \\

REDIS_OPTIONS: {
    port: +process.env.REDIS_PORT,
    //aka host
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
},

// session \\
SESSION_OPTIONS: {
    secret: process.env.SESSION_SECRET,
    genid: (req) => {
        nanoid()
    },
    name: process.env.SESSION_NAME,
    cookie: {
        maxAge: +process.env.SESSION_IDLE_TIMEOUT,
        secure: IN_PROD, //if true then transmit cookie over https
        httpOnly: IN_PROD, //if true: prevents client side JS from reading the cookie
        sameSite: true,
    },
    rolling: true,
    resave: false, //if call is made and nothing is added, then we will not override session
    saveUninitialized: false, //if you make a request to the server, and no data iss stored to the session then it will not be written to the database.
}
//can objects hoist?^
// app \\

// server \\
}

module.exports = config