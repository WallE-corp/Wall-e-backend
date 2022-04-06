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
           * @param {number} x 
           * @param {number} y
           * @param {String} mapId 
           * @param {Map<Any, Any>} callback
           */
          getPointByCoordinate: function(mapId,x,y, callback) {
               const docRef = admin.firestore().collection('maps').doc(mapId)

               docRef.get().then((map)=>{
                    const data = map.data()
                    if(data){
                         for(let point of data ){
                              if(point.coordinates.x == x && point.coordinates.y == y) callback(point)
                         }
                    }
                    callback('PointNotFound')
               }).catch((error)=> {
                    callback('DatabaseError')
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