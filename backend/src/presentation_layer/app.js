/* eslint-disable camelcase */
const express = require('express')
const app = express()
const awilix = require('awilix')
const bodyParser = require('body-parser')

require('../data_access_layer/database')

const pointRepository = require('../data_access_layer/point_repository')
const pointManager = require('../business_logic_layer/point_manager')
const pointRouter = require('./routers/point_router')

const mapRepository = require('../data_access_layer/map_repository')
const mapManager = require('../business_logic_layer/map_manager')
const mapRouter = require('./routers/map_router')

// awilix containers
const container = awilix.createContainer()

container.register('pointRepository', awilix.asFunction(pointRepository))
container.register('pointManager', awilix.asFunction(pointManager))
container.register('pointRouter', awilix.asFunction(pointRouter))

container.register('mapRepository', awilix.asFunction(mapRepository))
container.register('mapManager', awilix.asFunction(mapManager))
container.register('mapRouter', awilix.asFunction(mapRouter))

// container.register('db', awilix.asFunction(db))
// resolve the containers

const point_router = container.resolve('pointRouter')
const map_router = container.resolve('mapRouter')

const server = require('http').createServer(app)
require('./socketio/')(server)

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
// use the routes
app.use('/pathpoints', point_router)
app.use('/map', map_router)

server.listen(8080, function () {
    console.log("Web application listening on port 3000.")
})

module.exports.server = server
