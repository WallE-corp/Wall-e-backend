const express = require('express')
module.exports = function ({pointRepository}){

    const router = express.Router()
  
    router.get("/", (req, res) => {
     console.log("Welcome")
    })
    
   return router
   
}