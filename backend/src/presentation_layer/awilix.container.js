const awilix = require('awilix')

// awilix containers
const container = awilix.createContainer()

// Get db connection
const db = require('../data_access_layer/database')
const db = getDbConnection()
container.register('db', awilix.asValue(db))

// reposositories (replace the code below to our needs)
const pointRepository = require('../data_access_layer/point_repository')
const pointManager = require('../business_logic_layer/point_manager')
const pointRouter = require('./routers/point_router')

const mapRepository = require('../data_access_layer/map_repository')
const mapManager = require('../business_logic_layer/map_manager')
const mapRouter = require('./routers/map_router')

const obstacleRouter = require('./routers/obstacle_router')
const obstacleEventManager = require('../business_logic_layer/obstacle_event_manager')

const SocketIOServer = require('./socketio/')

container.register('pointRepository', awilix.asFunction(pointRepository))
container.register('pointManager', awilix.asFunction(pointManager))
container.register('pointRouter', awilix.asFunction(pointRouter))

container.register('mapRepository', awilix.asFunction(mapRepository))
container.register('mapManager', awilix.asFunction(mapManager))
container.register('mapRouter', awilix.asFunction(mapRouter))

container.register('SocketIOServer', awilix.asClass(SocketIOServer))
container.register('obstacleRouter', awilix.asFunction(obstacleRouter))
container.register('obstacleEventManager', awilix.asFunction(obstacleEventManager))

const { Storage } = require('@google-cloud/storage')
container.register('storage', awilix.asClass(Storage))

const uploadImage = require('../business_logic_layer/utility/upload_image')
container.register('uploadImage', awilix.asFunction(uploadImage))

module.exports = container

// const modules = [
//     'src/data_access_layer/**/*.js',
//     'src/business_logic_layer/**/*.js',
//     'src/presentation_layer/routers/**/*.js'
// ]
// container.loadModules(modules, {
//     formatName: 'camelCase'
// })

// const autoLoadedModules = awilix.listModules(modules)
// console.log("Auto-loaded modules", autoLoadedModules.map(m => m.name))