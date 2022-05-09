const keys = require('./__keys__')
const admin = require("firebase-admin")

let initialized = false

function initialize () {
    let config

    if (process.env.FIREBASE_TARGET === "emulator") {
        console.log("Targeting emulator...")
        config = {
            projectId: process.env.FIREBASE_PROJECT_ID
        }
    } else {
        console.log("Targeting live...")
        const key = keys.getGoolgeCloudPlatformProjectKey()
        config = {
            credential: admin.credential.cert(key.serviceAccount),
            storageBucket: "wall-e-db.appspot.com"
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
