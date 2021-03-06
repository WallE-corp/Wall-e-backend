const pointManagerFunc = require("../src/business_logic_layer/point_manager")

describe("Point Manager", () => {
    let pointManager
    let dependencies
    beforeAll(() => {
        dependencies = {
            pointRepository: {
                addPoint: jest.fn().mockImplementation((point, callback) => {
                    callback(null)
                }),
                getLastPoint: jest.fn().mockResolvedValue({ x: 1, y: 2 }),
                setLastPoint: jest.fn().mockResolvedValue(true)
            },
            addTwoPoints: require("../src/business_logic_layer/utility/add_two_points")(),
            SocketIOServer: {
                sendCommand: jest.fn()
            }
        }
        pointManager = pointManagerFunc(dependencies)
    })

    it('Should add correct point to database', async () => {
        // Given
        const point = {
            x: 2,
            y: 2
        }
        const lastPoint = {
            x: 1,
            y: 1
        }
        const getLastPointSpy = jest
            .spyOn(dependencies.pointRepository, 'getLastPoint')
            .mockReturnValue(lastPoint)
        const setLastPointSpy = jest
            .spyOn(dependencies.pointRepository, 'setLastPoint')
            .mockReturnValue(true)
        const addPointSpy = jest.spyOn(dependencies.pointRepository, 'addPoint')

        // When
        const newPoint = await pointManager.addPointRelativeToLast(point)
        // Then
        const expectedPoint = {
            x: 3,
            y: 3
        }
        expect(getLastPointSpy).toHaveBeenCalled()
        expect(setLastPointSpy).toHaveBeenCalledWith(expectedPoint)
        expect(addPointSpy).toHaveBeenCalledWith(expectedPoint, expect.any(Function))
        expect(newPoint).toEqual(expectedPoint)
    })
})
