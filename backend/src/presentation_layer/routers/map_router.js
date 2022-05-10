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
