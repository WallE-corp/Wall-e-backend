const express = require('express')

module.exports = function ({ pointManager }) {
    const router = express.Router()

    router.get("/", (req, res) => {
        pointManager.getAllPathPoints((error, data) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json(data)
            }
        })
    })

    router.get("/:mapId", (req, res) => {
        const mapId = req.params.mapId

        const coordinates = {
            x: parseFloat(req.body.x),
            y: parseFloat(req.body.y)
        }

        pointManager.getPointByCoordinateManager(mapId, coordinates, function (error, point) {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json(point)
            }
        })
    })

    router.post('/', (req, res) => {
        const x = req.body.x
        const y = req.body.y

        pointManager.addPoint({ x, y }, function (errors) {
            if (errors) { return res.status(500) }
            res.status(201)
            console.log("status ok")
        })
    })

    return router
}
