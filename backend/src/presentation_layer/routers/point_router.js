const { response } = require('express')
const express = require('express')

module.exports = function ({ pointManager }){

    const router = express.Router()
  
    router.get("/", (req, res) => {
     console.log("Welcome")
    })
    
    router.post('/addPoint', (req, res) => {
        const x = req.body.x
        const y = req.body.y
        const mapId = req.body.mapId

        pointManager.addPoint(mapId, {x, y}, function(errors) {
            if(errors){ return res.status(500)}
            res.status(201)
            console.log("status ok")
        })
    })

   return router
   
}