const awilix = require('awilix')

// reposositories (replace the code below to our needs)
const pointRepository = require('../data_access_layer/point_repository')
const pointManager = require('../business_logic_layer/point_manager')
const pointRouter = require('./routers/point_router')

const mapRepository = require('../data_access_layer/map_repository')
const mapManager = require('../business_logic_layer/map_manager')
const mapRouter = require('./routers/map_router')

const obstacleRouter = require('./routers/obstacle_router')
const obstacleEventManager = require('../business_logic_layer/obstacle_event_manager')
const obstacleEventRepository = require('../data_access_layer/obstacle_event_repository')
const uploadImage = require('../business_logic_layer/utility/upload_image')
const dtoValidator = require('../business_logic_layer/dto_validator')
// awilix container
const container = awilix.createContainer()

// Get db connection
const { getDatabaseConnection, getStorageConnection, getAdminSDK } = require('../data_access_layer/database')
const db = getDatabaseConnection()
const storage = getStorageConnection()
const admin = getAdminSDK()
const SocketIOServer = require('./socketio/')

container.register({
     SocketIOServer: awilix.asClass(SocketIOServer).setLifetime(awilix.Lifetime.SINGLETON),
     storage: awilix.asValue(storage),
     db: awilix.asValue(db),
     admin: awilix.asValue(admin),
     'pointRouter': awilix.asFunction(pointRouter ),
     'pointRepository' : awilix.asFunction(pointRepository),
     'pointManager' : awilix.asFunction(pointManager),

     'mapRepository' : awilix.asFunction(mapRepository),
     'mapManager' : awilix.asFunction(mapManager),
     'mapRouter' : awilix.asFunction(mapRouter),

     'obstacleEventRepository' : awilix.asFunction(obstacleEventRepository),
     'obstacleRouter' : awilix.asFunction(obstacleRouter),
     'obstacleEventManager' : awilix.asFunction(obstacleEventManager),
     'dtoValidator': awilix.asFunction(dtoValidator),
     'uploadImage': awilix.asFunction(uploadImage),

})

// const modules = [
//     'src/data_access_layer/*/*.js',
//     'src/business_logic_layer/*/*.js',
//     'src/presentation_layer/routers/*.js'
// ]
// container.loadModules(modules)

// const b = awilix.listModules()

// const autoLoadedModules = awilix.listModules(modules)
// console.log("Auto-loaded modules", autoLoadedModules.map(m => m.name))

module.exports = container