const { collection, addDoc, getFirestore } = require("firebase/firestore")

function obstacleEventRepository ({ db }) {
    async function addObstacleEvent(imageUrl, x, y, label) {
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
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    return {
        addObstacleEvent,
    }
}

module.exports = obstacleEventRepository
