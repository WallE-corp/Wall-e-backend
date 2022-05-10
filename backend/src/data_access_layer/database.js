const serviceAccount = require("./wall_e_db_private_key.json")
const admin = require("firebase-admin")

let initialized = false

function initialize () {
    let config = {
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "wall-e-db.appspot.com"
    }

    if (process.env.FIREBASE_TARGET === "emulator") {
        console.log("Using emulator")
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
