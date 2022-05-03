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
                addObstacleEvent: jest.fn().mockResolvedValue(mockObstacleEventObj)
            },
            uploadImage: jest.fn().mockResolvedValue('someImageLink'),
            SocketIOServer: {
                broadcastCommand: jest.fn().mockImplementation((type, client, data) => {
                    // Do nothing
                })
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
        const broadcastCommandSpy = jest.spyOn(dependencies.SocketIOServer, 'broadcastCommand')
        // When
        const result = await obstacleManager.handleObstacleEvent(obstacleEventData)

        // Then
        expect(broadcastCommandSpy).toHaveBeenCalledWith(9, null, result)
        expect(result).toEqual(mockObstacleEventObj)
    })
})
