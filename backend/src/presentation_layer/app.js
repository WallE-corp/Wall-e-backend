const express = require('express')
const app = express()
const awilix = require('awilix')
const db = require('../data_access_layer/database')


//reposositories (replace the code below to our needs)
const routerRepository = require('../data_access_layer/router_repository')
const routerManager = require('../business_logic_layer/router_manager')
const routeRouter = require('./routers/router')

const pointRepository = require('../data_access_layer/point_repository')
const pointManager = require('../business_logic_layer/point_manager')
const pointRouter = require('./routers/point_router')
const obstacleRouter = require('./routers/obstacle_router')

// awilix containers
const container = awilix.createContainer()

container.register('routerRepository', awilix.asFunction(routerRepository))
container.register('routerManager', awilix.asFunction(routerManager))
container.register('routeRouter', awilix.asFunction(routeRouter))

container.register('pointRepository', awilix.asFunction(pointRepository))
container.register('pointManager', awilix.asFunction(pointManager))
container.register('pointRouter', awilix.asFunction(pointRouter))
container.register('obstacleRouter', awilix.asFunction(obstacleRouter))

//container.register('db', awilix.asFunction(db))
// resolve the containers

const route_router = container.resolve('routeRouter')
const point_router = container.resolve('pointRouter')
const obstacle_router = container.resolve('obstacleRouter')

// use the routes

app.use('/', route_router)
app.use('/point', point_router)
app.use('/obstacle', obstacle_router)

app.listen(8080, function () {
  console.log("Web application listening on port 3000.")
})
