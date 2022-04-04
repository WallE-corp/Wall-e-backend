const express = require('express')
module.exports = function ({ }){

    const router = express.Router()
  
    router.get("/", (req, res) => {
        console.log("just a get empty request")
    })
    
   return router
   
}