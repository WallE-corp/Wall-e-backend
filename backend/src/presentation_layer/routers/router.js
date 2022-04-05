const express = require('express')
module.exports = function ({pointRepository}){

    const router = express.Router()
  
    router.get("/", (req, res) => {
        pointRepository.getAllPoints()

        console.log("just a get empty request")


    })
    
   return router
   
}