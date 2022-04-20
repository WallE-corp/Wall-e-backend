const socketIo = require('socket.io')

// Enums -------------
const MOVEMENT = 4
const REGISTRATION = 6
//

let io = null
let remoteClientId = null
let wallEClientId = null

const commandFunctions = {}
// Registration request
commandFunctions[REGISTRATION] = (client, { data }) => {
    switch (data.role) {
    case 'remote':
        // TODO remove this
        remoteClientId = client.id
        console.log('\n')
        console.log('Client', client.id)
        console.log('Registered as remote')
        console.log(data)
        break
    case 'wall-e':
        // TODO remove this
        console.log('\n')
        console.log('Client', client.id)
        console.log('Registered as wall-e')
        console.log(data)
        wallEClientId = client.id
        break
    default:
        console.log('Unknown role')
        break
    }
}
// Movement request
commandFunctions[MOVEMENT] = (client, data) => {
    if (remoteClientId && client.id === remoteClientId && wallEClientId) {
        io.to(wallEClientId).emit('message', JSON.stringify(data))
    }
}

function onMessage (client, message) {
    try {
        const messageData = JSON.parse(message)
        console.log(message)
        const commandFunction = commandFunctions[`${messageData.type}`]
        commandFunction(client, messageData)
    } catch (e) {
        console.log(e)
    }
}

function addClient (client) {
    client.on('message', message => onMessage(client, message))
}

function init (server) {
    io = socketIo(server, {
        cors: {
            origin: '*'
        }
    })

    io.on('connection', client => {
        console.log('Client connected', client.id)
        addClient(client)
    })
}

module.exports = init
