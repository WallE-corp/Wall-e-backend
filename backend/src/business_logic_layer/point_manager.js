const fs = require('fs')
const { fileURLToPath } = require('url')


module.exports = function ({ pointRepository }) {
    return {

        getAllPathPoints: function (callback) {
            pointRepository.getAllPathPoints(callback)
        },

        /**
         * 
         * @param {Map<Object, any>} point 
         * @param { void } callback 
         */
        managePoint: function (point, callback) {
            if (Object.keys(point).empty) {
                callback('PointEmpty', null)
            }else if (!point.x || !point.y) {
                callback('InvalidCoordinates', null)
            }  else {
                const filePath = './backend/src/data_access_layer/last_point.json'
                let lastPoint
                if(fs.existsSync(filePath)){
                    lastPoint = fs.readFileSync( filePath)
                    lastPoint = JSON.parse(lastPoint)
                    lastPoint.x = point.x + lastPoint.x
                    lastPoint.y = point.y + lastPoint.y
                }else{
                    lastPoint = point
                }      

                let data = JSON.stringify(lastPoint, null, 2);
                
                fs.writeFile(filePath, data, (error) => {
                    if (error) {
                        callback('CouldNotWriteToFile',null)
                        return
                    }
                    callback(null,lastPoint)
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
