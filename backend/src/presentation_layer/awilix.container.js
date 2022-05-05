const awilix = require('awilix')

// awilix container
const container = awilix.createContainer()

const { getDatabaseConnection, getStorageConnection, getAdminSDK } = require('../data_access_layer/database')
const getCloudVisionClient = require('../data_access_layer/cloud_vision_client')
const SocketIOServer = require('./socketio/')

container.register({
    SocketIOServer: awilix.asClass(SocketIOServer).setLifetime(awilix.Lifetime.SINGLETON),
    storage: awilix.asFunction(getStorageConnection), // Cloud Storage
    db: awilix.asFunction(getDatabaseConnection), // Firestore
    client: awilix.asFunction(getCloudVisionClient), // Cloud Vision API Client
    admin: awilix.asFunction(getAdminSDK) // Firebase Admin SDK
})

// Auto load modules by glob pattern
const modules = [
    'src/data_access_layer/**/*.js',
    'src/business_logic_layer/**/*.js',
    'src/presentation_layer/routers/**/*.js'
]
container.loadModules(modules, {
    formatName: 'camelCase'
})

const autoLoadedModules = awilix.listModules(modules)
console.log("Auto-loaded modules", autoLoadedModules.map(m => m.name))

module.exports = container
