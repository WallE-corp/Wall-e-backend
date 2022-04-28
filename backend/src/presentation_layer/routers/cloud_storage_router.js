const express = require('express');
// const { getStorage } = require('firebase-admin/storage');
const { Storage } = require('@google-cloud/storage')




module.exports = function ({}){
    const storage = new Storage() 
    const bucket = storage.bucket('gs://walle-6a679.appspot.com')

    bucket.upload('/gucci.png', { 
        destination: 'images/gucci.png',
        gzip: true
    }).then(data => {
    console.log('upload success', data)
    }).catch(error => {
    console.log(error)
    })

    return router

}