const fs = require('fs')

module.exports = function ({ pointRepository }) {
    return {

        getAllPathPoints: function (callback) {
            pointRepository.getAllPathPoints(callback)
        },

        getLastPoint: function () {
            const filePath = './backend/src/data_access_layer/last_point.json'
            if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath)
                const dataObject = JSON.parse(fileData)
                return dataObject
            }
            return null
        },

        setLastPoint: function (point) {
            try {
                const filePath = './backend/src/data_access_layer/last_point.json'
                fs.writeFileSync(filePath, JSON.stringify(point))
                return true
            } catch (e) {
                console.error(e)
                return false
            }
        },

        /**
         *
         * @param {Map<Object, any>} point
         * @param { void } callback
         */
        managePoint: function (point, callback) {
            if (Object.keys(point).empty) {
                callback('PointEmpty', null)
            } else if (!point.x || !point.y) {
                callback('InvalidCoordinates', null)
            } else {
                // Get last point from file
                const lastPoint = this.getLastPoint()
                let currentPoint = JSON.parse(JSON.stringify(lastPoint))

                // Add lastPoint to point
                if (currentPoint === null) currentPoint = point
                else {
                    currentPoint.x = point.x + currentPoint.x
                    currentPoint.y = point.y + currentPoint.y
                }

                // Save point to file
                const didSave = this.setLastPoint(currentPoint)

                if (!didSave) {
                    callback('CouldNotWriteToFile', null)
                    return
                }

                // Add point to database
                pointRepository.addPoint(currentPoint, (errors) => {
                    if (errors) {
                        callback(errors, null)
                        return
                    }
                    callback(null, currentPoint)
                })
            }
        },

        addPoint: function (coordinates, callback) {
            if (!coordinates.x || !coordinates.y) { return }
            pointRepository.addPoint(coordinates, callback)
        },

        /**
         * @param {Map<Object, number>} coordinates
         * @param {String} mapId
         * @param {void} callback
         */
        getPointByCoordinateManager: function (mapId, coordinates, callback) {
            if (mapId.length === 0) callback('InvalidMapId', null)
            else if ((coordinates.x && coordinates.y)) {
                pointRepository.getPointByCoordinate(mapId, coordinates, callback)
            } else {
                callback('InvalidCoordinates', null)
            }
        }

    }
}
