const obstacleManagerFunc = require('../src/business_logic_layer/obstacle_event_manager')

const mockObstacleEventObj = {
    documentId: "",
    imageUrl: "",
    x: 1,
    y: 2,
    label: "catgirl",
    timestamp: Date.now()
}

describe('Obstacle Event Manager', () => {
    let obstacleManager
    let dependencies
    beforeAll(() => {
        dependencies = {
            obstacleEventRepository: {
                addObstacleEvent: jest.fn().mockResolvedValue(mockObstacleEventObj),
                getImageClassification: jest.fn().mockResolvedValue('Human body')
            },
            uploadImage: jest.fn().mockResolvedValue('someImageLink'),
            SocketIOServer: {
                sendCommand: jest.fn().mockImplementation((type, client, data) => {
                    // Do nothing
                })
            },
            dtoValidator: {
                validateObstacleEventDto: jest.fn().mockReturnValue(true)
            }
        }
        obstacleManager = obstacleManagerFunc(dependencies)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("Should handle obstacle event and return the created event data", async () => {
        // Given
        const obstacleEventData = {
            tmpImageFilePath: 'someImageFilePath',
            x: 1,
            y: 2
        }
        const sendCommandSpy = jest.spyOn(dependencies.SocketIOServer, 'sendCommand')
        const getImageClassificationSpy = jest
            .spyOn(dependencies.obstacleEventRepository, 'getImageClassification')
            .mockResolvedValue('Human body')
        // When
        const result = await obstacleManager.handleObstacleEvent(obstacleEventData)
        // Then
        expect(getImageClassificationSpy).toHaveBeenCalledWith('someImageLink')
        expect(sendCommandSpy).toHaveBeenCalledWith(9, null, result)
        expect(result).toEqual(mockObstacleEventObj)
    })

    it('Should throw "Validation Error"', async () => {
        // Given
        const obstacleEventData = {
            tmpImageFilePath: 'someImageFilePath',
            x: NaN,
            y: NaN
        }
        jest.spyOn(dependencies.dtoValidator, 'validateObstacleEventDto')
            .mockReturnValue(false)

        // When Then
        await expect(obstacleManager.handleObstacleEvent(obstacleEventData)).rejects.toEqual('Validation Error')
    })
})
