///=============\\\
//   server.js  \\
///=============\\\
// Dependencies \\
require('dotenv').config()
const config = require('./config.js')
const APP_PORT = process.env.APP_PORT
const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const methodOverride = require('method-override')
const cors = require('cors')
const morgan = require('morgan')
const redSession = require('./middlewares/session.js')
const helmet = require("helmet")
const {accessibleRecordsPlugin} = require('@casl/mongoose')

// controller assignment \\
const usersController = require('./controllers/users.js')
const tagsController = require('./controllers/tags.js')
const forumsController = require('./controllers/forums.js')
const commentsController = require('./controllers/comments.js')

//plugin to use casl with mongoose
mongoose.plugin(accessibleRecordsPlugin)
mongoose.connect(
    config.MONGODB_URI, config.MONGODB_OPTIONS
)

// DB error checks&&success \\
db.on('error', (err) => console.log(err.message + 'Is mongodb not running?'))
db.on('connected', ()=> console.log('Your mongod has connected'))
db.on('disconnected', ()=> console.log('Your mongod has disconnected'))

// open connection to mongod! \\
db.on('open', ()=>{})

// middleware \\
app.use(helmet()) //TODO expand on the defaults that helmetjs adds.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
//I don't think I need this since the above line is extended to true instead of false
app.use(methodOverride('_method'))
app.use(morgan('dev'))

//TODO a proper logger, most likely something to replace morgan with.

//redis session management
app.use(redSession)

// routes \\
app.use('/user', usersController)
app.use('/forum', forumsController)
app.use('/comment', commentsController)
app.use('/tag', tagsController)

// port \\
app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`)
})