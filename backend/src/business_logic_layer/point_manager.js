module.exports = function ({ pointRepository }) {
    return {
        getAllPoints: function (callback) {
            pointRepository.getAllPoints(callback)
        }
    }

}