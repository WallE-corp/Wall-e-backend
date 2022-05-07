/* eslint-disable no-throw-literal */
const fs = require('fs')
const path = require('path')
const util = require('util')

module.exports = function ({ pointRepository }) {
    function getAllPathPoints (callback) {
        pointRepository.getAllPathPoints(callback)
    }

    function getLastPoint () {
        const filePath = path.join(__dirname, '../data_access_layer/last_point.json')
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath)
            const dataObject = JSON.parse(fileData)
            return dataObject
        }
        return null
    }

    function setLastPoint (point) {
        try {
            const filePath = path.join(__dirname, '../data_access_layer/last_point.json')
            fs.writeFileSync(filePath, JSON.stringify(point))
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    function addPoints (pointA, pointB) {
        return {
            x: pointA.x + pointB.x,
            y: pointA.y + pointB.y
        }
    }

    async function addPointRelativeToLast (point) {
        // TODO: Validate pointDto
        const lastPoint = await this.getLastPoint()
        const currentPoint = lastPoint ? this.addPoints(point, lastPoint) : JSON.parse(JSON.stringify(point))
        const didSet = await this.setLastPoint(currentPoint)
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
        getLastPoint,
        setLastPoint,
        managePoint,
        addPoint,
        addPoints,
        getPointByCoordinateManager,
        addPointRelativeToLast
    }
}
