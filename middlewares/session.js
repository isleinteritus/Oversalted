const config = require('../config.js')
const Redis = require('ioredis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const client = new Redis(config.REDIS_OPTIONS)

module.exports = session({
    ...config.SESSION_OPTIONS, 
    store: new RedisStore({ 
        client 
    }),
})