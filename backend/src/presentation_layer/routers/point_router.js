const express = require('express')
module.exports = function ({ pointRepository, pointManager }) {

    const router = express.Router()

    router.get("/", (req, res) => {
        pointManager.getAllPoints((error, data) => {
            if (error)
                res.sendStatus(500).json(error)
            else
                res.sendStatus(200).json(data)

        })

    })
    return router

}