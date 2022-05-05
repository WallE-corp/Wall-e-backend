const path = require('path')

function getKey (keyName) {
    return path.join(__dirname, `${keyName}.json`)
}

function getGoolgeCloudPlatformProjectKey () {
    const keyPath = getKey("wall_e_db_private_key")
    const serviceAccount = require(keyPath)
    return {
        keyPath,
        serviceAccount
    }
}

/**
 * @deprecated Use the single Cloud Platform Project Key instead
 */
function getCloudVisionAPIKey () {
    const keyPath = getKey("google_cloud_auth_key")
    const serviceAccount = require(keyPath)
    return {
        keyPath,
        serviceAccount
    }
}

/**
 * @deprecated Use the single Cloud Platform Project Key instead
 */
function getCloudStorageKey () {
    const keyPath = getKey("walle-6a679-19e1b7dfe649")
    const serviceAccount = require(keyPath)
    return {
        keyPath,
        serviceAccount
    }
}

module.exports = {
    getGoolgeCloudPlatformProjectKey,
    getCloudVisionAPIKey,
    getCloudStorageKey
}
