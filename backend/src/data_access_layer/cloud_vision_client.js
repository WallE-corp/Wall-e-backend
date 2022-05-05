const vision = require("@google-cloud/vision")
const keys = require('./__keys__')

let client = null

function getCloudVisionClient () {
    if (client === null) {
        const key = keys.getGoolgeCloudPlatformProjectKey()
        client = new vision.ImageAnnotatorClient({
            // keyFilename: path.join(__dirname, "google_cloud_auth_key.json")
            keyFilename: key.keyPath
        })
    }
    return client
}

module.exports = getCloudVisionClient
