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

  router.put('/event', multerUpload.single('image'), (req, res, next) => {
    const obstacle_event_data = {
      ...req.body,
      tmpImageFilePath: req.file.path
    }
    obstacleEventManager.handle_obstacle_event(obstacle_event_data)
    res.status(201).send('OK');
  })

  return router
}
