// variables \\
require('dotenv').config()
const IN_PROD = process.env.NODE_ENV === 'production'

export default config = {

// database \\
MONGODB_URI: {
    MONGODB_URI: `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?${process.env.MONGO_OPTION}`
},
MONGO_CONNECTION_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},

// cache \\

REDIS_OPTIONS: {
    port: +process.env.REDIS_PORT,
    host: process.env.REDIS_ENDPOINT,
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
    saveUninitialize: false,
}
//can objects hoist?^v
// app \\

// server \\
}