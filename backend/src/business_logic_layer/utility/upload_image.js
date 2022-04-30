const path = require('path')

module.exports = function ({ storage }) {
    return async function (imagePath) {
        const bucket = storage.bucket('gs://walle-6a679.appspot.com')
        try {
            const fileName = path.basename(imagePath)
            const data = await bucket.upload(imagePath, {
                destination: `images/${fileName}`, gzip: true
            })
            const mediaLink = data[0].metadata.mediaLink
            return mediaLink
        } catch (error) {
            console.error(error)
        }
    }
}
