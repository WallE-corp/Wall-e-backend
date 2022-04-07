const { response } = require('express')
const express = require('express')

module.exports = function ({ pointManager }) {

    const router = express.Router()

    router.get("/", (req, res) => {
        console.log("Welcome")
    })

    router.post('/addPoint', (req, res) => {


        var x = req.body

        console.log(x)
        res.sendStatus(200)
        // pointManager.addPoint(date, time, imagePath, {x,y}, function(errors) {
        //     if(errors){ return res.status(500)}
        //     res.status(200)
        //     console.log("status ok")
        // })
    })

    return router

}