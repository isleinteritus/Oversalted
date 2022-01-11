///=============\\\
//  Dependencies \\
///=============\\\
require('dotenv').config()
const express = require ('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cors = require('cors')
const logger = require('morgan')

// Database and connections
const MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//error checks&&success
db.on('error', (err) => console.log(err.message + 'Is mongodb not running?'))
db.on('connected', ()=> console.log('Your mongod has connected'))
db.on('disconnected', ()=> console.log('Your mongod has disconnected'))

//open connection to mongod!
db.on('open', ()=>{})

//middleware
//turns off a deprication error with findByIdAndUpdate
//mongoose.set('useFindAndModify', false)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
//I don't think I need this since the above line is extended to true instead of false
app.use(methodOverride('_method'))
app.use(logger('dev'))

//controller assignment
const usersController = require('./controllers/users.js')
const tagsController = require('./controllers/tags.js')
const forumsController = require('./controllers/forums.js')
const commentsController = require('./controllers/comments.js')

//routes
app.use('/user', usersController)
app.use('/forum', forumsController)
app.use('/comment', commentsController)
app.use('/tag', tagsController)

//port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})