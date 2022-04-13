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
                         callback(['NoExistingMap'], null)
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
           * @param {Map<Object, number>} coordinates
           * @param {String} mapId 
           * @param {void} callback
           */
          getPointByCoordinate: function(mapId,coordinates, callback) {
               const docRef = admin.firestore().collection('maps',null).doc(mapId)
               docRef.get().then((map)=>{
                    const data = map.data()
                    if(data){
                         for(let point of data.points ){
                              if(point.coordinates){
                                   if(point.coordinates.x == coordinates.x && point.coordinates.y == coordinates.y) {
                                        callback(null,point)
                                        return
                                   }  
                              }  
                         }
                    }
                    callback('PointNotFound',null)
               }).catch((error)=> {
                    callback('DatabaseError',null)
               })
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