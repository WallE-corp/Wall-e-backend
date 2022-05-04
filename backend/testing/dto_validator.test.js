describe('Dto Validator', () => {
    let dtoValidator

    beforeAll(() => {
        dtoValidator = require('../src/business_logic_layer/dto_validator')()
    })

    it('Should successfully validate obstacle event dto', () => {
        // Given
        const obstacleEventDto = {
            tmpImageFilePath: 'tmpImageFilePath',
            x: 1,
            y: 1
        }
        // When
        const result = dtoValidator.validateObstacleEventDto(obstacleEventDto)
        // Then
        expect(result).toBeTruthy()
    })

    it('Should fail to validate obstacle event dto', () => {
        // Given
        const obstacleEventDto = {
            tmpImageFilePath: 'tmpImageFilePath',
            x: NaN,
            y: 1
        }
        // When
        const result = dtoValidator.validateObstacleEventDto(obstacleEventDto)
        // Then
        expect(result).toBeFalsy()
    })
})
