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
const { MOVEMENT, REGISTRATION, OBSTACLE_EVENT, POSITION_DATA } = require('./command_types')
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

    registerClient (role, clientId) {
        if (role === "remote") this.remoteClientId = clientId
        else if (role === "wall-e") this.wallEClientId = clientId
    }

    registerCommandFunctions () {
        // Registration request
        this.commandFunctions[REGISTRATION] = (client, { data }) => {
            switch (data.role) {
            case 'remote':
                this.registerClient(data.role, client.id)
                break
            case 'wall-e':
                this.registerClient(data.role, client.id)
                break
            default:
                console.log('Unknown role')
                break
            }
        }
        // Movement request
        this.commandFunctions[MOVEMENT] = (client, data) => {
            if (this.remoteClientId && client.id === this.remoteClientId && this.wallEClientId) {
                this.io.to(this.wallEClientId).emit('message', JSON.stringify(data))
                console.log("Movement data sent")
            }
        }
        // Auto request
        this.commandFunctions[10] = (client, data) => {
            if (this.remoteClientId && client.id === this.remoteClientId && this.wallEClientId) {
                data.type = 10
                this.io.to(this.wallEClientId).emit('message', JSON.stringify(data))
                console.log("Auto data sent")
            }
        }
        // Obstacle event
        this.commandFunctions[OBSTACLE_EVENT] = (client, data) => {
            if (this.remoteClientId) {
                this.io.to(this.remoteClientId).emit('message', JSON.stringify(data))
            }
        }
        // Position data
        this.commandFunctions[POSITION_DATA] = (client, data) => {
            if (this.remoteClientId) {
                this.io.to(this.remoteClientId).emit('message', JSON.stringify(data))
            }
        }
    }

    onMessage (client, message) {
        try {
            const messageData = JSON.parse(message)
            const commandFunction = this.commandFunctions[`${messageData.type}`]
            commandFunction(client, messageData.data)
            console.log(messageData)
        } catch (e) {
            console.log(e)
        }
    }

    sendCommand (type, client, data) {
        try {
            const commandFunction = this.commandFunctions[`${type}`]
            commandFunction(client, {
                type,
                data
            })
        } catch (e) {
            console.error(e)
        }
    }

    addClient (client) {
        client.on('message', message => this.onMessage(client, message))
    }
}

module.exports = SocketIOServer
