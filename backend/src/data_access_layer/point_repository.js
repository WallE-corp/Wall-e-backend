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

               // const docRef = admin.firestore().collection('WallE').doc('test');
               // docRef.set({
               //      first: 'Adasdaa',
               //      last: 'Lovelace',
               //      born: 2000
               // });

          },

          /**
           * @param {String} id 
           * @param {Map<String, Any>} callback
           */
          getPointById: function (id, callback) {

          },

          /**
           * @param {Object} current
           * @param {Map<Number>} coordinates 
           * @param {Map<String, Any>} callback
          */

          addPoint: function (current, coordinates, callback) {
               const docRef = admin.firestore().collection('maps').doc('mapId')
               docRef.set({
                    points: [
                         current = {
                              time: current.time,
                              date: current.date,
                              coordinates: coordinates
                         },
                    ]
               }).then(() => {
                    callback(null, 200)
                   
               }).catch((error) => {
                    callback(error)
               })    
          }
     }
}