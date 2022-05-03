const { OBSTACLE_EVENT } = require('../presentation_layer/socketio/command_types')
const fs = require('fs')

module.exports = ({ obstacleEventRepository, uploadImage, SocketIOServer }) => {
    return {
        handleObstacleEvent: async (obstacleEventData) => {
            // TODO: Validate incoming data
            const { tmpImageFilePath, x, y } = obstacleEventData
            // TODO: Correct x and y values to get reall position on map
            try {
                // [Du Won] Store image in Cloud Storage
                const imageUrl = await uploadImage(tmpImageFilePath)

                // TODO: Delete tmp image file
                fs.unlink(tmpImageFilePath, (e) => {
                    if (e) {
                        // TODO: report that was unable to delete tmp file
                    }
                })

                // TODO: [Ahmad] Begin async request to classify image

                // Create an obstacle event document in Cloud Firestore
                const obstacleEvent = await obstacleEventRepository.addObstacleEvent(imageUrl, x, y, 'catgirl')

                // notify mobile of obstacle event
                SocketIOServer.sendCommand(OBSTACLE_EVENT, null, obstacleEvent)

                return obstacleEvent
            } catch (e) {
                console.error(e)
                throw e
            }
        }
    }
}
