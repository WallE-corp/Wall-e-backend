module.exports = () => {
    return {
        handle_obstacle_event: (obstacleEventData) => {
            const { tmpImageFilePath } = obstacleEventData
            console.log(`Obstacle event: ${tmpImageFilePath}`)
            // [Du Won] Store image in Cloud Storage

            // [Ahmad] Begin async request to classify image

            // Create an obstacle event document in Cloud Firestore

            // notify mobile of obstacle event
        }
    }
}
