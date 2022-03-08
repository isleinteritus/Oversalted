const User = require('../models/user.js')
const express = require('express')
const session = require('express-session')

const ROLES = {
    admin: 'admin',
    mod: 'mod',
    user: 'user'
}
const roleCheck ={

}

//permissions
const canAlter = () => {

}


module.exports = {
    roleCheck
}