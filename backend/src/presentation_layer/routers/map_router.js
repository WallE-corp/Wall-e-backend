const express = require('express')
module.exports = function ({ mapManager }) {
    const router = express.Router()

    router.get("/", (req, res) => {
        mapManager.getAllMaps((error, documents) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(documents)
            }
        })
    })

    // To Create A New Map
    router.post("/", (req, res) => {
        mapManager.createMap((error, mapId) => {
            if (error) {
                res.status(503).json(error)
            } else {
                const id = JSON.stringify(mapId, null, 2);
                fs.writeFile(filePath, id, (error) => {
                    if (error) {
                        res.status(503).json(error)
                        return
                    }
                    res.sendStatus(203)

                })
            }
        })
    })

    router.get("/:id", (req, res) => {
        const id = req.params.id
        mapManager.getMapById(id, (error, document) => {
            if (error) {
                res.status(400).json(error)
            } else {
                console.log(document)
                res.status(200).json(document)
            }
        })
    })
    return router
}
