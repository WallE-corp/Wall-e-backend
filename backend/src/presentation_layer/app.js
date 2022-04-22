const express = require('express')
const app = express()
const awilix = require('awilix')
const bodyParser = require('body-parser')

require('../data_access_layer/database')



//reposositories (replace the code below to our needs)
const routerRepository = require('../data_access_layer/router_repository')
const routerManager = require('../business_logic_layer/router_manager')
const routeRouter = require('./routers/router')

const pointRepository = require('../data_access_layer/point_repository')
const pointManager = require('../business_logic_layer/point_manager')
const pointRouter = require('./routers/point_router')

const mapRepository = require('../data_access_layer/map_repository')
const mapManager = require('../business_logic_layer/map_manager')
const mapRouter = require('./routers/map_router')

const borderRepository = require('../data_access_layer/border_repository')
const borderManager = require('../business_logic_layer/border_manager')
const borderRouter = require('./routers/border_router')

// awilix containers
const container = awilix.createContainer()

container.register('routerRepository', awilix.asFunction(routerRepository))
container.register('routerManager', awilix.asFunction(routerManager))
container.register('routeRouter', awilix.asFunction(routeRouter))

container.register('pointRepository', awilix.asFunction(pointRepository))
container.register('pointManager', awilix.asFunction(pointManager))
container.register('pointRouter', awilix.asFunction(pointRouter))

container.register('borderRepository', awilix.asFunction(borderRepository))
container.register('borderManager', awilix.asFunction(borderManager))
container.register('borderRouter', awilix.asFunction(borderRouter))

container.register('mapRepository', awilix.asFunction(mapRepository))
container.register('mapManager', awilix.asFunction(mapManager))
container.register('mapRouter', awilix.asFunction(mapRouter))

//container.register('db', awilix.asFunction(db))
// resolve the containers

const point_router = container.resolve('pointRouter')
const map_router = container.resolve('mapRouter')


const cors = require('cors')
app.use(cors({ origin: '*' }))


app.use(express.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}))
// use the routes
app.use('/pathpoints', point_router)

app.use('/map', map_router)



app.listen(8080, function () {
  console.log("Web application listening on port 3000.")
})
