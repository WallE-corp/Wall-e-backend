const socketIo = require('socket.io')

/**
 * Because of how sockets works either we can either
 * choose to support clusters of node server
 * which here means that all running instances of this application
 * will share remote and wall-e clients
 *  !!! WHICH WOULD BE THE BEST OPTION IRL BUUUUUUUTTTT !!!
 * I'm too lazy to learn how to do that and i don't think
 * we'll be running more than one instance of this application anyway
 */

// Enums -------------
const MOVEMENT = 4
const REGISTRATION = 6
//

class SocketIOServer {
    constructor () {
        this.io = null
        this.remoteClientId = null
        this.wallEClientId = null
        this.commandFunctions = {
            meep: 3
        }
        this.registerCommandFunctions()
    }

    initialize (server) {
        this.io = socketIo(server, {
            cors: {
                origin: '*'
            }
        })

        this.io.on('connection', client => {
            console.log('Client connected', client.id)
            this.addClient(client)
        })
    }

    registerCommandFunctions () {
        // Registration request
        this.commandFunctions[REGISTRATION] = (client, { data }) => {
            switch (data.role) {
            case 'remote':
                this.remoteClientId = client.id
                break
            case 'wall-e':
                this.wallEClientId = client.id
                break
            default:
                console.log('Unknown role')
                break
            }
        }
        // Movement request
        this.commandFunctions[MOVEMENT] = (client, data) => {
            if (this.remoteClientId && client.id === this.remoteClientId && this.wallEClientId) {
                console.log(data)
                this.io.to(this.wallEClientId).emit('message', JSON.stringify(data))
            }
        }
    }

    onMessage (client, message) {
        try {
            const messageData = JSON.parse(message)
            console.log(message)
            console.log(this.commandFunctions)
            const commandFunction = this.commandFunctions[`${messageData.type}`]
            commandFunction(client, messageData)
        } catch (e) {
            console.log(e)
        }
    }

    addClient (client) {
        client.on('message', message => this.onMessage(client, message))
    }
}

module.exports = SocketIOServer
