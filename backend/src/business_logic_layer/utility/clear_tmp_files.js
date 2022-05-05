const fs = require('fs')
const path = require('path')

function clearTmpFile (filePath) {
    const fileDir = path.dirname(filePath)

    if (fileDir !== 'tmp') {
        throw Error("Attempting to delete temporary file outside of tmp directory")
    }

    fs.unlink(filePath, (e) => {
        if (e) {
            throw Error(`Unable to delete temporary file ${filePath}`)
        }
    })
}

module.exports = {
    clearTmpFile
}
