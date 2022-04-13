module.exports = function () {
    return {
        getAllMaps: function (callback) {
            pointRepository.getAllMaps(callback)
        }
    }

}