module.exports = ({ obstacleEventRepository }) => {
    return {
        handle_obstacle_event: (obstacleEventData) => {
            const { tmpImageFilePath } = obstacleEventData
            console.log(`Obstacle event: ${tmpImageFilePath}`)
            // [Du Won] Store image in Cloud Storage

            // [Ahmad] Begin async request to classify image

            // Create an obstacle event document in Cloud Firestore
            obstacleEventRepository.addObstacleEvent(
                'meep',
                2,
                2,
                'catgirl'
            )
            // notify mobile of obstacle event
        }
    }
}
