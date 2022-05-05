/* eslint-disable no-throw-literal */

function obstacleEventRepository ({ db, admin, client }) {
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

    async function getImageClassification (imageUrl) {
        try {
            const [result] = await client.labelDetection(imageUrl)
            if (result.error) {
                console.error('CLoud Vision API:', result.error.message)
                // throw "Cloud Vision API failed to process image"
                return "Unknown"
            }
            return result.labelAnnotations[0].description
        } catch (e) {
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
