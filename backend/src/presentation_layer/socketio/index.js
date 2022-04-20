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
        remoteClientId = client.id
        break
    case 'wall-e':
        wallEClientId = client.id
        break
    default:
        console.log('Unknown role')
        break
    }
}
// Movement request
commandFunctions[MOVEMENT] = (client, data) => {
    console.log('\n')
    console.log('Movement request from', client.id)
    console.log('Current remote', remoteClientId)
    console.log('Current walle', wallEClientId)
    console.log(data)
    if (remoteClientId && client.id === remoteClientId && wallEClientId) {
        io.to(wallEClientId).emit('message', data)
    }
}

function onMessage (client, message) {
    try {
        const messageData = JSON.parse(message)
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
        addClient(client)
    })
}

module.exports = init
