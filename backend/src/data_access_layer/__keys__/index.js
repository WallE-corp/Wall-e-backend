const path = require('path')

function getKey (keyName) {
    return path.join(__dirname, `${keyName}.json`)
}

function getGoolgeCloudPlatformProjectKey () {
    const keyName = "wall_e_db_private_key"
    const keyPath = getKey(keyName)
    let serviceAccount = null

    try {
        serviceAccount = require(keyPath)
    } catch (error) {
        throw Error(`[MISSING KEY] ${keyName}.json`)
    }

    return {
        keyPath,
        serviceAccount
    }
}

/**
 * @deprecated Use the single Cloud Platform Project Key instead
 */
function getCloudVisionAPIKey () {
    const keyName = "google_cloud_auth_key"
    const keyPath = getKey(keyName)
    let serviceAccount = null

    try {
        serviceAccount = require(keyPath)
    } catch (error) {
        throw Error(`[MISSING KEY] ${keyName}.json`)
    }

    return {
        keyPath,
        serviceAccount
    }
}

/**
 * @deprecated Use the single Cloud Platform Project Key instead
 */
function getCloudStorageKey () {
    const keyName = "walle-6a679-19e1b7dfe649"
    const keyPath = getKey(keyName)
    let serviceAccount = null

    try {
        serviceAccount = require(keyPath)
    } catch (error) {
        throw Error("Missing key", `[MISSING KEY] ${keyName}.json`)
    }

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
