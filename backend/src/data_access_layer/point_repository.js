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
           * @param {number} x 
           * @param {number} y
           * @param {Date} dateTime
           * @param {Map<String, Any>} callback
          */
          addPoint: function (x, y, dateTime, callback) {

          }
     }

}