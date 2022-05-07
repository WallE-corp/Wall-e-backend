module.exports = function () {
    return function (pointA, pointB) {
        return {
            x: pointA.x + pointB.x,
            y: pointA.y + pointB.y
        }
    }
}
