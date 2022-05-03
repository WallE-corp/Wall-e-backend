/* eslint-disable no-throw-literal */
function obstacleEventRepository ({ db }) {
    async function addObstacleEvent (imageUrl, x, y, label) {
        try {
            const collectionRef = db.collection("obstacleEvents")
            const obstacleEventDoc = {
                imageUrl,
                x,
                y,
                label,
                timestamp: Date.now()
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

    return {
        addObstacleEvent
    }
}

module.exports = obstacleEventRepository