const admin = require("firebase-admin")

module.exports = function ({ }) {


     return {
          /**
           * @param {Map<String, Any>[]} callback
           */
          getAllPoints: function (callback) {
               // db.firestore  === undifined
               // console.log(db.firestore)
               // console.log(typeof db.firestore)

               const docRef = admin.firestore().collection('WallE').doc('test');
               docRef.set({
                    first: 'Adasdaa',
                    last: 'Lovelace',
                    born: 2000
               });

          },

          /**
           * @param {String} id 
           * @param {Map<String, Any>} callback
           */
          getPointById: function (id, callback) {

          },

          /**
           * @param {String} date
           * @param {String} imagePath
           * @param {Map<Number>} cordinates 
           * @param {String} time
           * @param {Map<String, Any>} callback
          */

          addPoint: function (date, time, imagePath, cordinates, callback) {
               const docRef = admin.firestore().collection('maps').doc('mapId')
               docRef.set({
                    time: time,
                    date: date,
                    Image: imagePath,
                    cordinates: cordinates
               }).then(() => {
                    alert("point added")
               }).catch((error) =>{
                    alert("error")
               })
          }

     }

}