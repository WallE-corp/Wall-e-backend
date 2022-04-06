const express = require('express')
module.exports = function ({pointRepository}){

    const router = express.Router()
  
    router.get("/", (req, res) => {
        pointRepository.getAllPoints((error, data) => {
            if(!error)
                console.log(data)
            else 
                console.log(error)
        })

        res.sendStatus(200)
    })   
   return router
   
}