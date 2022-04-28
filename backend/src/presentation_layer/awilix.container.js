const awilix = require('awilix')

// reposositories (replace the code below to our needs)
const pointRepository = require('../data_access_layer/point_repository')
const pointManager = require('../business_logic_layer/point_manager')
const pointRouter = require('./routers/point_router')

const mapRepository = require('../data_access_layer/map_repository')
const mapManager = require('../business_logic_layer/map_manager')
const mapRouter = require('./routers/map_router')

const obstacleRouter = require('./routers/obstacle_router')
const obstableEventManager = require('../business_logic_layer/obstacle_event_manager')

const SocketIOServer = require('./socketio/')

// awilix containers
const container = awilix.createContainer()

container.register('pointRepository', awilix.asFunction(pointRepository))
container.register('pointManager', awilix.asFunction(pointManager))
container.register('pointRouter', awilix.asFunction(pointRouter))

container.register('mapRepository', awilix.asFunction(mapRepository))
container.register('mapManager', awilix.asFunction(mapManager))
container.register('mapRouter', awilix.asFunction(mapRouter))

container.register('SocketIOServer', awilix.asClass(SocketIOServer))
container.register('obstacleRouter', awilix.asFunction(obstacleRouter))
container.register('obstacleEventManager', awilix.asFunction(obstableEventManager))

const { Storage } = require('@google-cloud/storage')
container.register('storage', awilix.asClass(Storage))

const uploadImage = require('../business_logic_layer/utility/upload_image')
container.register('uploadImage', awilix.asFunction(uploadImage))

module.exports = container
