const express = require('express')


module.exports = function ({ pointManager }) {

    const router = express.Router()

    router.get("/", (req, res) => {
        pointManager.getAllPathPoints((error, data) => {
            if (error) {
                res.status(500).json(error)
            }
            else {
                res.status(200).json(data)
            }
        })
    })

    router.get("/:mapId", (req, res) => {
        const mapId = req.params.mapId;

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

        const point = {
            x: parseFloat(req.body.x),
            y: parseFloat(req.body.y)
        }
        pointManager.managePoint(point, function(error, managedPoint){
            if(error){
                res.status(404).json(error)
            }else{
                
                pointManager.addPoint(managedPoint, function (errors) {
                    if (errors) { 
                        res.status(500).send(errors) 
                        return
                    }
                    res.sendStatus(201)
                })
            }
        })
      
    })
    
    return router
}
