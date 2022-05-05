const awilix = require('awilix')

// awilix container
const container = awilix.createContainer()

const { getDatabaseConnection, getStorageConnection, getAdminSDK } = require('../data_access_layer/database')
const getCloudVisionClient = require('../data_access_layer/cloud_vision_client')
// Get external connections
const db = getDatabaseConnection() // Firestore
const storage = getStorageConnection() // Cloud Storage
const admin = getAdminSDK() // Firebase Admin SDK
const client = getCloudVisionClient() // Cloud Vision Client
const SocketIOServer = require('./socketio/')

container.register({
    SocketIOServer: awilix.asClass(SocketIOServer).setLifetime(awilix.Lifetime.SINGLETON),
    storage: awilix.asValue(storage),
    db: awilix.asValue(db),
    client: awilix.asValue(client),
    admin: awilix.asValue(admin)
})

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
