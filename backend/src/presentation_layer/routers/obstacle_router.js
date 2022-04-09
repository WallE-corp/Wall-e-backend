const express = require("express")
const multer = require("multer")

module.exports = () => {
  const router = express.Router()
  const multerStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../../data_access_layer/data/tmp/")
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(" ").join("-")
      cb(null, fileName)
    }
  })
  const multerUploadMiddleware = multer({ storage: storage })

  router.put('/event', multerUploadMiddleware, (req, res, next) => {
    res.status(201).send('OK');
  })
}
