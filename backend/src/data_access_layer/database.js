const initializeApp = require("firebase-admin/app")
const serviceAccount = require("./wall_e_db_private_key.json")
const admin = require("firebase-admin")

function getDatabaseConnection () {
    initializeApp.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    return admin.firestore()
}

module.exports = getDatabaseConnection
