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
//const bodyParser= require('morgan')

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

//route assignment
const users = require('./routes/users')
const forums = require('./routes/forums')
const comments = require('./routes/comments')
const tags = require('./routes/tags')

//middleware
//turns off a deprication error with findByIdAndUpdate
//mongoose.set('useFindAndModify', false)
app.use(cors())
app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: true}))
//I don't think I need this since the above line is extended to true instead of false
//app.use(bodyParser.json())
app.use(methodOverride('_method'))
//app.use(logger('dev'))

//routes
app.use('/user', users)
app.use('/forum', forums)
app.use('/comment', comments)
app.use('/tag', tags)

//port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})