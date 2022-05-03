require('dotenv').config()
const firebaseAdmin = require("firebase-admin")

describe('Obstacle Event Repository', () => {
    let obstacleRepository
    let db
    beforeAll(() => {
        firebaseAdmin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID
        })
        db = firebaseAdmin.firestore()
        obstacleRepository = require("../src/data_access_layer/obstacle_event_repository")({ db })
    })

    afterEach(async () => {
        /*
        const collectionRef = db.collection('obstacleEvents')
        const snapshot = await collectionRef.orderBy('timestamp', 'desc').get()
        snapshot.docs.forEach((doc) => {
            doc.ref.delete()
        })
        */
        jest.clearAllMocks()
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
