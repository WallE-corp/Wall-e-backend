const express = require('express')
module.exports = function ({ pointRepository }) {

    const router = express.Router()

    router.get("/", (req, res) => {
        res.sendStatus(200)
    })

    return router

}