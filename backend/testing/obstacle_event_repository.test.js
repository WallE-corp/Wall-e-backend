require('dotenv').config()
const container = require('../src/presentation_layer/awilix.container.js')
describe('Obstacle Event Repository', () => {
    let _obstacleRepository
    
    beforeAll(() => {
        _obstacleRepository = container.resolve('obstacleEventRepository')
    })

    it('Should create an obstacle event', async () => {
        // Given

        // When

        // Then
    })
})