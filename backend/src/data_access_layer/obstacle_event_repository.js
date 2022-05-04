/* eslint-disable no-throw-literal */

const vision = require("@google-cloud/vision")
const path = require('path')

const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname,"google_cloud_auth_key.json")
})

function obstacleEventRepository ({ db, admin }) {
    async function addObstacleEvent (imageUrl, x, y, label) {
        try {
            const collectionRef = db.collection("obstacleEvents")
            const obstacleEventDoc = {
                imageUrl,
                x,
                y,
                label,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            }
            const docRef = await collectionRef.add(obstacleEventDoc)
            const docSnap = await docRef.get()
            return {
                ...docSnap.data(),
                documentId: docSnap.id
            }
        } catch (e) {
            console.log(e)
            throw "Internal Error"
        }
    }

    async function getImageClassification(imageUrl){
        try{
            const results = await client.labelDetection(imageUrl)
            return results[0].labelAnnotations[0].description
        }catch (e) {
            console.log(e)
            throw e
        }
       
    } 

    return {
        addObstacleEvent,
        getImageClassification
    }
}

module.exports = obstacleEventRepository
