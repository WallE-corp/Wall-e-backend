const express = require("express")
const multer = require("multer")
const path = require("path")

module.exports = ({ obstacleEventManager }) => {
    const router = express.Router()
    const multerStorageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "./../../data_access_layer/data/tmp/"))
        }
    })
    const multerUpload = multer({ storage: multerStorageConfig })

    router.put('/event', multerUpload.single('image'), async (req, res, next) => {
        console.log("Attempting to upload image")
        const obstacleEventData = {
            ...req.body,
            tmpImageFilePath: req.file.path
        }
        try {
            await obstacleEventManager.handleObstacleEvent(obstacleEventData)
            res.status(201).send('OK')
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    })

    return router
}
