const admin = require("firebase-admin")

module.exports = function () {

     return {
          /**
           * @param {Map<String, Any>[]} callback
           */
          getAllPoints: function (callback) {
               const docRef = admin.firestore().collection('maps');
               docRef.get().then((docSnap) => {
                    if (docSnap.empty) {
                         callback('Doc does not exists', null)
                    } else {
                         let pointMap = new Map()
                         docSnap.forEach(doc => {
                              pointMap.set(doc.id, doc.data().points)
                         });
                         callback(null, pointMap)
                    }
               })

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