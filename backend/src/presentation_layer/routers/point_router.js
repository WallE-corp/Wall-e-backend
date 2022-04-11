const { response } = require('express')
const express = require('express')

module.exports = function ({ pointManager }){

    const router = express.Router()
  
    router.get("/", (req, res) => {
     console.log("Welcome")
    })
    
    router.post('/addPoint', (req, res) => {

        let date = new Date()

        const current = {
            date: date.toISOString().split('T')[0],
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
        console.log(current)
        
        const x = req.body.x
        const y = req.body.y
        const mapId = req.body.mapId

        console.log(x, y)

        pointManager.addPoint(mapId, current, {x, y}, function(errors) {
            if(errors){ return res.status(500)}
            res.status(201)
            console.log("status ok")
        })
    })

   return router
   
}