const fs = require('fs')
const path = require('path')

module.exports = function ({ db, admin }) {
    function getAllPathPoints (callback) {
        const docRef = db.collection('maps').doc("mapTest")
        docRef.get().then((docSnap) => {
            if (docSnap.empty) {
                callback('NoExistingMap', null)
            } else {
                callback(null, docSnap.data().PathPoints)
            }
        }).catch((e) => {
            console.log(e)
            callback('InternalError', null)
        })
    }

    function getPointByCoordinate (mapId, coordinates, callback) {
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
            callback('PointNotFound', null)
        }).catch(() => {
            callback('DatabaseError', null)
        })
    }

    function addPoint (coordinates, callback) {
        const docRef = db.collection('maps').doc('mapTest')
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

    function getLastPoint () {
        const filePath = path.join(__dirname, 'last_point.json')
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath)
            const dataObject = JSON.parse(fileData)
            return dataObject
        }
        return null
    }

    function setLastPoint (point) {
        try {
            const filePath = path.join(__dirname, 'last_point.json')
            fs.writeFileSync(filePath, JSON.stringify(point))
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    return {
        getAllPathPoints,
        getPointByCoordinate,
        addPoint,
        getLastPoint,
        setLastPoint
    }
}
