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
        const imageUrl= 'https://storage.googleapis.com/download/storage/v1/b/walle-6a679.appspot.com/o/images%2F928d99b0e0b7209e2f41ca8faefaa189?generation=1651573640972560&alt=media'
            
        // When
        const result = await obstacleRepository.getImageClassification(imageUrl)
        // Then
        expect(result).toEqual(
            'Human body'
        )
    })
})
