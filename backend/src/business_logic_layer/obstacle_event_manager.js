/* eslint-disable no-throw-literal */
const { OBSTACLE_EVENT } = require('../presentation_layer/socketio/command_types')

module.exports = ({ obstacleEventRepository, uploadImage, SocketIOServer, dtoValidator, clearTmpFile, pointManager }) => {
    async function pushObstacleEvent (obstacleEvent) {
        SocketIOServer.sendCommand(OBSTACLE_EVENT, null, obstacleEvent)
    }

    async function handleObstacleEvent (obstacleEventData) {
        obstacleEventData.x = Number(obstacleEventData.x)
        obstacleEventData.y = Number(obstacleEventData.y)
        const validationResult = dtoValidator.validateObstacleEventDto(obstacleEventData)
        if (!validationResult) {
            clearTmpFile(obstacleEventData.tmpImageFilePath)
            throw "Validation Error"
        }

        const { tmpImageFilePath, x, y } = obstacleEventData
        const realPos = await pointManager.getPointRelativeToLast({ x, y })

        try {
            // Store image in Cloud Storage
            const imageUrl = await uploadImage(tmpImageFilePath)

            // Clear tmp file
            clearTmpFile(tmpImageFilePath)

            // Begin async request to classify image
            const classification = await obstacleEventRepository.getImageClassification(imageUrl)

            // Create an obstacle event document in Cloud Firestore
            const obstacleEvent = await obstacleEventRepository.addObstacleEvent(imageUrl, realPos.x, realPos.y, classification)

            // notify mobile of obstacle event
            pushObstacleEvent(obstacleEvent)

            return obstacleEvent
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    return {
        handleObstacleEvent
    }
}
