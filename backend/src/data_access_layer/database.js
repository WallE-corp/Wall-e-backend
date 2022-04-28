
const initializeApp = require("firebase-admin/app")
const serviceAccount = require("./wall_e_db_private_key.json")
const admin = require("firebase-admin")
// const { getStorage } = require('firebase-admin/storage')



initializeApp.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     // storageBucket: 'walle-6a679.appspot.com'
})

// const bucket = getStorage().bucket();

// bucket.upload('./gucci.png', { destination: 'images'}).then(data => {
//      console.log('upload success', data)
// }).catch(error => {
//      console.log(error)
// })

