// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app" 
import { getAnalytics } from "firebase/analytics" 
var admin = require("firebase-admin") 
var serviceAccount = require("./wall_e_db_private_key.json") // kontakt Ahmad if you want to gain access to file

module.exports = function (){

     // TODO: Add SDKs for Firebase products that you want to use
     // https://firebase.google.com/docs/web/setup#available-libraries

     const firebaseConfig = {
          apiKey: "AIzaSyA-kPR0jiRfDIyWL40qvapxbkPoP8fAsG8",
          authDomain: "walle-6a679.firebaseapp.com",
          projectId: "walle-6a679",
          storageBucket: "walle-6a679.appspot.com",
          messagingSenderId: "901302768965",
          appId: "1:901302768965:web:044a9ca9d36798ef81da2c",
          measurementId: "G-YBVQ7BQH8R"
     } 
     // Initialize Firebase
     var dbAppInit = initializeApp(firebaseConfig) 
     this.exports.dbApp = dbAppInit
     this.exports.analytics = getAnalytics(dbAppInit) 

     admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
     }) 

     this.exports.fireStore = admin.firestore() 
     this.exports.storage = admin.storage() 
     
     return this.exports


}
