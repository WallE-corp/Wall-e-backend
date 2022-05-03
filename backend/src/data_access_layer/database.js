const initializeApp = require("firebase-admin/app")
const serviceAccount = require("./wall_e_db_private_key.json")
const admin = require("firebase-admin")

let initialized = false

function initialize () {
    let config = {
        credential: admin.credential.cert(serviceAccount)
    }

    if (process.env.FIREBASE_TARGET === "emulator") {
        config = {
            projectId: process.env.FIREBASE_PROJECT_ID
        }
    }

    initializeApp.initializeApp(config)
    initialized = true
}

function getDatabaseConnection () {
    if (!initialized) {
        initialize()
    }
    return admin.firestore()
}

function getStorageConnection () {
    if (!initialized) {
        initialize()
    }
    return admin.storage()
}

module.exports = {
    getDatabaseConnection,
    getStorageConnection
}
