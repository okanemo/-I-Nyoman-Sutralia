const express = require('express')
const router = express.Router()

const auth = require('../services/auth')
const users = require('../services/users-service')
const roles = require('../services/roles-service')
const userRole = require('../services/userRole-service')

module.exports = {
    router,
    auth,
    users,
    roles,
    userRole
}