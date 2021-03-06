/* eslint-disable no-throw-literal */
const path = require('path')

module.exports = function ({ storage }) {
    return async function (imagePath) {
        const bucket = storage.bucket(`gs://${process.env.FIREBASE_PROJECT_ID}.appspot.com`)
        try {
            const fileName = path.basename(imagePath)
            const data = await bucket.upload(imagePath, {
                destination: `images/${fileName}.jpg`, gzip: true
            })
            const mediaLink = data[0].metadata.mediaLink
            return mediaLink
        } catch (error) {
            console.error(error)
            throw "Image upload failed"
        }
    }
}
