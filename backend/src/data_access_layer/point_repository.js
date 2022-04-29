const admin = require("firebase-admin")
const db = admin.firestore()

module.exports = function () {
    return {
        /**
           * @param {Map<String, Any>[]} callback
           */
        getAllPathPoints: function (callback) {
            const docRef = db.collection('maps').doc("mapTest")
            docRef.get().then((docSnap) => {
                if (docSnap.empty) {
                    callback('NoExistingMap', null)
                } else {
                    callback(null, docSnap.data().PathPoints)
                }
            }).catch(() => {
                callback('InternalError', null)
            })
        },

        /**
           * @param {Map<Object, number>} coordinates
           * @param {String} mapId
           * @param {void} callback
           */
        getPointByCoordinate: function (mapId, coordinates, callback) {
            const docRef = db.collection('maps').doc(mapId)
            docRef.get().then((map) => {
                const data = map.data()
                if (data) {
                    for (const point of data.points) {
                        if (point.coordinates) {
                            if (point.coordinates.x === coordinates.x && point.coordinates.y === coordinates.y) {
                                callback(null, point)
                                return
                            }
                        }
                    }
                }
                /* for (const point of data.points) {
                    if (point.coordinates) {
                        if (point.coordinates.x ==== coordinates.x && point.coordinates.y ==== coordinates.y) {
                            callback(null, point)
                            return
                        }
                    }
                } */
                callback('PointNotFound', null)
            }).catch(() => {
                callback('DatabaseError', null)
            })
        },

        /**
           * @param {Map<Number>} coordinates
           * @param {Map<String, Any>} callback
          */

          addPoint: function (coordinates, callback) {
               const docRef = admin.firestore().collection('maps').doc('mapTest')
               docRef.update({
                    
                    points: admin.firestore.FieldValue.arrayUnion({
                         coordinates: coordinates
                    }),   

                points: admin.firestore.FieldValue.arrayUnion({
                    coordinates: coordinates
                })

            }).then(() => {
                callback(null, 200)
            }).catch((error) => {
                callback(error)
            })
        }
    }
}
