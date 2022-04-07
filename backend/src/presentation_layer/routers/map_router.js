const express = require('express')
module.exports = function ({ mapRepository }) {

    const router = express.Router()

    router.get("/", (req, res) => {
        mapRepository.getAllMaps((error, collections) => {
            if (!error) {
                console.log(collections)
                res.sendStatus(200)

            }
            else {
                console.log(error)
                res.sendStatus(400)
            }
        })
    })
    return router
}