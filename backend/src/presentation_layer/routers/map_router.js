const express = require('express')
module.exports = function ({ mapRepository, mapManager }) {

    const router = express.Router()

    router.get("/", (req, res) => {
        mapManager.getAllMaps((error, documents) => { //Use Manager instead of Repository
            if (error)
                res.status(400).json(error)
            else
                res.status(200).json(documents)
        })
    })
    return router
}