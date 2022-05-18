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

    router.post('/', async (req, res) => {
        const point = {
            x: parseFloat(req.body.x),
            y: parseFloat(req.body.y)
        }
        try {
            const translatedPoint = await pointManager.addPointRelativeToLast(point)
            console.log(translatedPoint)
            res.sendStatus(201)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
        /* pointManager.managePoint(point, function (error, managedPoint) {
            if (error) {
                res.status(500).json(error)
            } else {
                res.sendStatus(201)
            }
        }) */
    })

    return router
}
