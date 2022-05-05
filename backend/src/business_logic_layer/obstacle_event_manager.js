/* eslint-disable no-throw-literal */
const { OBSTACLE_EVENT } = require('../presentation_layer/socketio/command_types')

module.exports = ({ obstacleEventRepository, uploadImage, SocketIOServer, dtoValidator, clearTmpFile }) => {
    return {
        handleObstacleEvent: async (obstacleEventData) => {
            obstacleEventData.x = Number(obstacleEventData.x)
            obstacleEventData.y = Number(obstacleEventData.y)
            const validationResult = dtoValidator.validateObstacleEventDto(obstacleEventData)
            if (!validationResult) {
                clearTmpFile(obstacleEventData.tmpImageFilePath)
                throw "Validation Error"
            }

            // TODO: Correct x and y values to get reall position on map
            const { tmpImageFilePath, x, y } = obstacleEventData

            try {
                // Store image in Cloud Storage
                const imageUrl = await uploadImage(tmpImageFilePath)

                // Clear tmp file
                clearTmpFile(tmpImageFilePath)

                // Begin async request to classify image
                const classification = await obstacleEventRepository.getImageClassification(imageUrl)

                // Create an obstacle event document in Cloud Firestore
                const obstacleEvent = await obstacleEventRepository.addObstacleEvent(imageUrl, x, y, classification)

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
