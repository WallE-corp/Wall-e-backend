require('dotenv').config()
const uploadImage = require('../src/business_logic_layer/utility/upload_image')
const firebaseAdmin = require("firebase-admin")
const path = require('path')

describe('Upload Image to Cloud', () => {
    let _uploadImage

    beforeAll(() => {
        firebaseAdmin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID
        })
        _uploadImage = uploadImage({ storage: firebaseAdmin.storage() })
    })

    it('Should upload image and return its destination', async () => {
        // Given
        const imagePath = path.join(__dirname, '/__testing_data__/gucci.png')

        // When
        const result = await _uploadImage(imagePath)

        // Then
        expect(result).toBeDefined()
    })
})
