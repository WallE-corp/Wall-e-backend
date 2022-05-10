const { isNumber, isString } = require('class-validator')

function dtoValidator () {
    function validateObstacleEventDto (obstacleEventDto) {
        const { tmpImageFilePath, x, y } = obstacleEventDto
        if (isNumber(x) && isNumber(y) && isString(tmpImageFilePath)) {
            return true
        }
        return false
    }

    return {
        validateObstacleEventDto
    }
}

module.exports = dtoValidator
