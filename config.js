// variables \\
require('dotenv').config()
const IN_PROD = process.env.NODE_ENV === 'production'

const config = {

// database \\
MONGODB_URI: `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?${process.env.MONGO_OPTION}`,


// cache \\

REDIS_OPTIONS: {
    port: +process.env.REDIS_PORT,
    //aka host
    endpoint: process.env.REDIS_ENDPOINT,
    password: process.env.REDIS_PASSWORD
},
// session \\
SESSION_OPTIONS: {
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    cookie: {
        maxAge: +process.env.SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
}
//can objects hoist?^v
// app \\

// server \\
}

module.exports = config