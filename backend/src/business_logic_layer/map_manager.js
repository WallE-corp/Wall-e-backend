module.exports = function ({ mapRepository }) {
    return {
        getAllMaps: function (callback) {
            mapRepository.getAllMaps(callback)
        }
    }
}
