// Import the functions you need from the SDKs you need
const initializeApp = require("firebase-admin/app")
//const getAnalytics = require("firebase/analytics")
const admin = require("firebase-admin") 
const serviceAccount = require("./wall_e_db_private_key.json")

module.exports = function (){
     const exports = {}
     // TODO: Add SDKs for Firebase products that you want to use
     // https://firebase.google.com/docs/web/setup#available-libraries

     // const firebaseConfig = {
     //      apiKey: "AIzaSyA-kPR0jiRfDIyWL40qvapxbkPoP8fAsG8",
     //      authDomain: "walle-6a679.firebaseapp.com",
     //      projectId: "walle-6a679",
     //      storageBucket: "walle-6a679.appspot.com",
     //      messagingSenderId: "901302768965",
     //      appId: "1:901302768965:web:044a9ca9d36798ef81da2c",
     //      measurementId: "G-YBVQ7BQH8R"
     // } 
     // initializeApp.initializeApp({
     //      credential: applicationDefault(), 
     //      databaseURL: 'https://walle-6a679.firebaseapp.com'
     // })
 
     //Initialize Firebase
     //var dbAppInit = initializeApp.initializeApp(firebaseConfig) 
     //exports.dbApp = dbAppInit
     //exports.analytics = getAnalytics.getAnalytics(dbAppInit) 
     //const testApp = initializeApp();

     initializeApp.initializeApp({
          credential: admin.credential.cert(serviceAccount)
     }) 

     exports.firestore = admin.firestore() 
     exports.storage = admin.storage() 
     
     return exports


}
