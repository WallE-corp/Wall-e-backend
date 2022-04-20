const admin = require("firebase-admin")
const db = admin.firestore()

module.exports = function () {
    return {
        /**
           * @param {Map<String, Any>[]} callback
           */
        getAllPoints: function (callback) {
            const docRef = db.collection('maps')
            docRef.get().then((docSnap) => {
                if (docSnap.empty) {
                    callback(['docNotFound'], null)
                } else {
                    const pointMap = new Map()
                    docSnap.forEach(doc => {
                        pointMap.set(doc.id, doc.data().points)
                    })
                    callback(null, pointMap)
                }
            })
        },

        /**
           * @param {Map<Object, number>} coordinates
           * @param {String} mapId
           * @param {void} callback
           */
        getPointByCoordinate: function (mapId, coordinates, callback) {
            const docRef = db.collection('maps', null).doc(mapId)
            docRef.get().then((map) => {
                const data = map.data()
                if (data) {
                    const point = data.points.find(point => point.x === coordinates.x && point.y === coordinates.y)
                    if (point) {
                        callback(null, point)
                        return
                    }
                    /* for (const point of data.points) {
                        if (point.coordinates) {
                            if (point.coordinates.x === coordinates.x && point.coordinates.y === coordinates.y) {
                                callback(null, point)
                                return
                            }
                        }
                    } */
                }
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
            const docRef = admin.firestore().collection('maps').doc('map')
            docRef.update({

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
