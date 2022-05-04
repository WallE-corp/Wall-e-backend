const awilix = require('awilix')

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
