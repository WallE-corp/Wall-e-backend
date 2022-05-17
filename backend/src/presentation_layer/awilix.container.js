const awilix = require('awilix')

// awilix container
const container = awilix.createContainer()

// Get db connection
const { getDatabaseConnection, getStorageConnection, getAdminSDK } = require('../data_access_layer/database')
const db = getDatabaseConnection()
const storage = getStorageConnection()
const admin = getAdminSDK()
const pointRouter = require('./routers/point_router')
const mapRouter = require('./routers/map_router')
const obstacleRouter = require('./routers/obstacle_router')
const pointManager = require('./routers/point_router')
const mapManager = require('./routers/map_router')
const obstacleManager = require('./routers/obstacle_router')
const pointRepository = require('./routers/point_router')
const mapRepository = require('./routers/map_router')
const obstacleRepository = require('./routers/obstacle_router')
const SocketIOServer = require('./socketio/')

container.register({
    SocketIOServer: awilix.asClass(SocketIOServer).setLifetime(awilix.Lifetime.SINGLETON),
    storage: awilix.asValue(storage),
    db: awilix.asValue(db),
    admin: awilix.asValue(admin),
    pointRouter:  awilix.asFunction(pointRouter),
    mapRouter:  awilix.asFunction(mapRouter),
    obstacleRouter:  awilix.asFunction(obstacleRouter),

    pointManager: awilix.asFunction(pointManager),
    mapManager: awilix.asFunction(mapManager),
    obstacleManager: awilix.asFunction(obstacleManager),

    pointRepository: awilix.asFunction(pointRepository),
    mapRepository: awilix.asFunction(mapRepository),
    obstacleRepository: awilix.asFunction(obstacleRepository)
})

// const modules = [
//     'src/data_access_layer/**/*.js',
//     'src/business_logic_layer/**/*.js',
//     'src/presentation_layer/routers/**/*.js'
// ]
container.loadModules(modules, {
    formatName: 'camelCase'
})

const autoLoadedModules = awilix.listModules(modules)
console.log("Auto-loaded modules", autoLoadedModules.map(m => m.name))

module.exports = container
