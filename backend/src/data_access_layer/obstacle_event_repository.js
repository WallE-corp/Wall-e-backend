const { collection, addDoc } = require("firebase/firestore")

function obstacleEventRepository ({ db }) {
    async function addObstacleEvent(imageUrl, x, y, label) {
        try {
            const collectionRef = collection(db, "obstacleEvents")
            const obstacleEventDoc = {
                imageUrl,
                x,
                y,
                label,
                timestamp: Date.now()
            }
            const docRef = await addDoc(collectionRef, obstacleEventDoc)
            return true
        } catch (e) {
            return false
        }
    }

    return {
        addObstacleEvent,
    }
}

module.exports = obstacleEventRepository
