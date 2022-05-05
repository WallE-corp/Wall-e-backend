require('dotenv').config()
const firebaseAdmin = require("firebase-admin")

describe('Obstacle Event Repository', () => {
    let obstacleRepository
    let dependencies
    beforeAll(() => {
        firebaseAdmin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID
        })
        dependencies = {
            db: firebaseAdmin.firestore(),
            admin: firebaseAdmin,
            client: {
                labelDetection: jest.fn().mockResolvedValue([{ labelAnnotations: [{ description: 'Catgirl' }] }])
            }
        }
        obstacleRepository = require("../src/data_access_layer/obstacle_event_repository")(dependencies)
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

    it('Should classify an obstacle', async () => {
        // Given
        const imageUrl = 'Some Image URL'
        const labelDetectionSpy = jest
            .spyOn(dependencies.client, 'labelDetection')
            .mockResolvedValue([{ labelAnnotations: [{ description: 'Catgirl' }] }])
        // When
        const result = await obstacleRepository.getImageClassification(imageUrl)
        // Then
        expect(labelDetectionSpy).toHaveBeenCalledWith(imageUrl)
        expect(result).toEqual('Catgirl')
    })
})
