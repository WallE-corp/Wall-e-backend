const EventEmitter = require('events')
const SocketIOServer = require("../src/presentation_layer/socketio")

describe('SocketIO', () => {
    let socketServer

    beforeEach(() => {
        socketServer = new SocketIOServer()
        socketServer.io = new EventEmitter()
    })

    it('Should register client a walle', () => {
        // Given
        const client = new EventEmitter()
        client.id = 69

        // When
        socketServer.commandFunctions[6](client, {
            type: 6,
            data: {
                role: 'wall-e'
            }
        })

        // Then
        expect(socketServer.wallEClientId).toBe(client.id)
    })

    it('Should attach command  functions', () => {
        expect(typeof socketServer.commandFunctions[4]).toBe('function')
        expect(typeof socketServer.commandFunctions[6]).toBe('function')
    })

    it('Should attach an event listener to the "message" event on client', () => {
        // Given
        const client = new EventEmitter()
        client.id = 69
        const messageSpy = jest.spyOn(socketServer, 'onMessage')
            .mockImplementation((client, message) => {
                // Do nothing
            })

        // When
        socketServer.addClient(client)
        client.emit('message', 'Meep')

        // Then
        expect(messageSpy).toHaveBeenCalledWith(client, 'Meep')
    })

    it('Should correctly pick out a function from command functions', () => {
        // Given
        const client = new EventEmitter()
        client.id = 69
        const message = {
            type: 69,
            not: {
                real: 'data'
            }
        }
        socketServer.commandFunctions[69] = jest.fn((client, data) => {
            // Do nothing
        })
        // When
        socketServer.onMessage(client, JSON.stringify(message))

        // Then
        expect(socketServer.commandFunctions[69]).toHaveBeenCalledWith(client,
            expect.objectContaining(message)
        )
    })
})
