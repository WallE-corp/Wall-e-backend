require('dotenv').config()
const firebaseAdmin = require("firebase-admin")

describe('Obstacle Event Repository', () => {
    let obstacleRepository
    beforeAll(() => {
        firebaseAdmin.initializeApp({
            projectId: "walle-6a679"
        })
        obstacleRepository = require("../src/data_access_layer/obstacle_event_repository")({ db: firebaseAdmin.firestore() })
    })

    it('Should create an obstacle event', async () => {
        // Given
        const obj = {
            imageUrl: 'meep',
            x: 1,
            y: 2,
            label: 'meep'
        }

        // When
        const result = await obstacleRepository.addObstacleEvent(obj.imageUrl, obj.x, obj.y, obj.label)
        // Then
        expect(result).toEqual(
            expect.objectContaining({
                ...obj
            })
        )
    })
})
