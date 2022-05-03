const awilix = require('awilix')

// awilix containers
const container = awilix.createContainer()

// Get db connection
const { getDatabaseConnection, getStorageConnection } = require('../data_access_layer/database')
const db = getDatabaseConnection()
container.register('db', awilix.asValue(db))

// const { Storage } = require('@google-cloud/storage')
const storage = getStorageConnection()
container.register('storage', awilix.asValue(storage))

// reposositories (replace the code below to our needs)
const pointRepository = require('../data_access_layer/point_repository')
const pointManager = require('../business_logic_layer/point_manager')
const pointRouter = require('./routers/point_router')

const mapRepository = require('../data_access_layer/map_repository')
const mapManager = require('../business_logic_layer/map_manager')
const mapRouter = require('./routers/map_router')

const obstacleRouter = require('./routers/obstacle_router')
const obstableEventManager = require('../business_logic_layer/obstacle_event_manager')
const obstacleEventRepository = require('../data_access_layer/obstacle_event_repository')
const SocketIOServer = require('./socketio/')

container.register('pointRepository', awilix.asFunction(pointRepository))
container.register('pointManager', awilix.asFunction(pointManager))
container.register('pointRouter', awilix.asFunction(pointRouter))

container.register('mapRepository', awilix.asFunction(mapRepository))
container.register('mapManager', awilix.asFunction(mapManager))
container.register('mapRouter', awilix.asFunction(mapRouter))

container.register('SocketIOServer', awilix.asClass(SocketIOServer).setLifetime(awilix.Lifetime.SINGLETON))
container.register('obstacleRouter', awilix.asFunction(obstacleRouter))
container.register('obstacleEventManager', awilix.asFunction(obstableEventManager))
container.register('obstacleEventRepository', awilix.asFunction(obstacleEventRepository))

const uploadImage = require('../business_logic_layer/utility/upload_image')
container.register('uploadImage', awilix.asFunction(uploadImage))

module.exports = container
