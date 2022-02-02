const User = require('../models/user.js')
const express = require('express')

const authentic = (req, res, next) => {
    if (req.session && req.session.user) {
        User.findOne({ 
                email: req.session.user.email 
        }, (error, user) => {
          if (user) {
            //TODO is there anything to do here?
          }
          // finishing processing the middleware and run the route
          next()
        })
      } else {
        next()
      }
}

module.exports = authentic