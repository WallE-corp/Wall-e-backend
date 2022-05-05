const path = require('path')

function getGoolgeCloudPlatformProjectKey () {
    const keyPath = path.join(__dirname, "wall_e_db_private_key.json")
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
    const keyPath = path.join(__dirname, "google_cloud_auth_key.json")
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
    const keyPath = path.join(__dirname, "walle-6a679-19e1b7dfe649.json")
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
