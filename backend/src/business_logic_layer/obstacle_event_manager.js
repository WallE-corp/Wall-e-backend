module.exports = ({ obstacleEventRepository, uploadImage }) => {
    return {
        handleObstacleEvent: async (obstacleEventData) => {
            // TODO: Validate incoming data
            const { tmpImageFilePath, x, y } = obstacleEventData

            try {
                // [Du Won] Store image in Cloud Storage
                const imageUrl = await uploadImage(tmpImageFilePath)

                // [Ahmad] Begin async request to classify image

                // Create an obstacle event document in Cloud Firestore
                const obstacleEvent = await obstacleEventRepository.addObstacleEvent(imageUrl, x, y, 'catgirl')

                // notify mobile of obstacle event
            } catch (e) {
                console.error(e)
                throw e
            }
        }
    }
}
