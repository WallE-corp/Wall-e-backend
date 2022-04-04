const express = require('express')
const app = express()
const awilix = require('awilix')


//reposositories (replace the code below to our needs)
const routerRepository = require('../data_access_layer/router-repository')
const routerManger = require ('../business_logic_layer/router-manager')
const routeRouter = require('./routers/router')
 
 
// awilix containers
const container = awilix.createContainer()
 
container.register('routerRepository', awilix.asFunction(routerRepository))
container.register('routerManager', awilix.asFunction(routerManger))
container.register('routeRouter', awilix.asFunction(routeRouter))
 
// resolve the containers
 
const route_router = container.resolve('routeRouter')
 
// use the routes
 
app.use('/router', route_router)

app.listen(8080, function () {
    console.log("Web application listening on port 3000.")
  })
  