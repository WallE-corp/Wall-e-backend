module.exports = function ({ pointRepository }) {
    return {

        getAllPathPoints: function (callback) {
            pointRepository.getAllPathPoints(callback)
        },


        managePoint: function (point, callback) {
            if (Object.keys(point).empty) {
                callback('pointEmpty', null)
            } else {
                pointRepository.getAllPathPoints((error, points) => {
                    if (error) {
                        callback(error, null)
                    }
                    else {
                        // Get last Point
                        let lastPoint = points[points.length - 1]
                        // Update x value in the point
                        point.x = point.x + lastPoint.x
                        // Update x value in the point
                        point.y = point.y + lastPoint.y
                        // Callback the updated point
                        callback(null, point)

                    }
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
            if (mapId.length == 0) callback('InvalidMapId', null)
            else if ((coordinates.x && coordinates.y)) {
                pointRepository.getPointByCoordinate(mapId, coordinates, callback)
            } else {
                callback('InvalidCoordinates', null)
            }
        }

    }

}
