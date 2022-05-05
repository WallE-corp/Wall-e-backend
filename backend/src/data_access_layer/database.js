const keys = require('./__keys__')
const admin = require("firebase-admin")

let initialized = false

function initialize () {
    const key = keys.getGoolgeCloudPlatformProjectKey()
    let config = {
        credential: admin.credential.cert(key.serviceAccount),
        storageBucket: "wall-e-db.appspot.com"
    }

    if (process.env.FIREBASE_TARGET === "emulator") {
        console.log("Using emulator...")
        config = {
            projectId: process.env.FIREBASE_PROJECT_ID
        }
    }

    admin.initializeApp(config)
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

function getAdminSDK () {
    if (!initialized) {
        initialize()
    }
    return admin
}

module.exports = {
    getDatabaseConnection,
    getStorageConnection,
    getAdminSDK
}
