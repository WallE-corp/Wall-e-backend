require('dotenv').config()
const uploadImage = require('../src/business_logic_layer/utility/upload_image')
const { Storage } = require('@google-cloud/storage')
const path = require('path')

describe('Upload Imag to Cloud', () => {
    let _uploadImage
    let storage
    beforeAll(() => {
        storage = new Storage()
        _uploadImage = uploadImage({storage})
    })

    it('Should upload image and return its destination', async () => {
        // Given
        const imagePath = path.join(__dirname, '/gucci.png')

        // When
        const result = await _uploadImage(imagePath)

        // Then
        expect(result).toBeDefined()
    })
})