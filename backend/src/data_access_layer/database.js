const initializeApp = require("firebase-admin/app")
const serviceAccount = require("./wall_e_db_private_key.json")
const admin = require("firebase-admin")

function getDatabaseConnection () {
    let config = {
        credential: admin.credential.cert(serviceAccount)
    }

    if (process.env.FIREBASE_TARGET === "emulator") {
        config = {
            projectId: "walle-6a679"
        }
    }

    initializeApp.initializeApp(config)
    return admin.firestore()
}

module.exports = getDatabaseConnection
