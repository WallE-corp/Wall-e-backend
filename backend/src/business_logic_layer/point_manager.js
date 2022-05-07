/* eslint-disable no-throw-literal */
const util = require('util')

module.exports = function ({ pointRepository, addTwoPoints }) {
    function getAllPathPoints (callback) {
        pointRepository.getAllPathPoints(callback)
    }

    async function getPointRelativeToLast (point) {
        const lastPoint = await pointRepository.getLastPoint()
        const currentPoint = lastPoint ? addTwoPoints(point, lastPoint) : JSON.parse(JSON.stringify(point))
        return currentPoint
    }

    async function addPointRelativeToLast (point) {
        // TODO: Validate pointDto
        const currentPoint = await this.getPointRelativeToLast(point)
        const didSet = await pointRepository.setLastPoint(currentPoint)
        if (!didSet) throw "Could not set last point"

        try {
            const asyncAddPoint = util.promisify(pointRepository.addPoint)
            await asyncAddPoint(currentPoint)
            return currentPoint
        } catch (error) {
            throw "Could not add point to database"
        }
    }

    /**
     * @deprecated Use addPointRelativeToLast
     * @param {Map<Object, any>} point
     * @param { void } callback
     */
    function managePoint (point, callback) {
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
    }

    /**
     * @param {Map<Object, number>} coordinates
     * @param {String} mapId
     * @param {void} callback
     */
    function getPointByCoordinateManager (mapId, coordinates, callback) {
        if (mapId.length === 0) callback('InvalidMapId', null)
        else if ((coordinates.x && coordinates.y)) {
            pointRepository.getPointByCoordinate(mapId, coordinates, callback)
        } else {
            callback('InvalidCoordinates', null)
        }
    }
    function addPoint (coordinates, callback) {
        if (!coordinates.x || !coordinates.y) { return }
        pointRepository.addPoint(coordinates, callback)
    }

    return {
        getAllPathPoints,
        managePoint,
        addPoint,
        getPointRelativeToLast,
        getPointByCoordinateManager,
        addPointRelativeToLast
    }
}
