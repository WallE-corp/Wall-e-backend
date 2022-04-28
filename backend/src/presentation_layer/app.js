require('dotenv').config()
/* eslint-disable camelcase */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('../data_access_layer/database')

const container = require('./awilix.container')

// resolve the containers
const point_router = container.resolve('pointRouter')
const map_router = container.resolve('mapRouter')
const socketIOServer = container.resolve('SocketIOServer')
const obstacle_router = container.resolve('obstacleRouter')

const server = require('http').createServer(app)

socketIOServer.initialize(server)
const cors = require('cors')
app.use(cors({ origin: '*' }))

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
// use the routes
app.use('/pathpoints', point_router)
app.use('/map', map_router)
app.use('/obstacle', obstacle_router)

app.listen(8080, function () {
  console.log("Web application listening on port 3000.")
})

module.exports.server = server
