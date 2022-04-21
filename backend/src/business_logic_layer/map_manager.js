module.exports = function ({mapRepository}) {
    return {
        getAllMaps: function (callback) {
            mapRepository.getAllMaps(callback)
        },

        getMapById: function(id , callback){
            if(id.length == 0){
                callback(['undefindedId'], null)
                return
            }
            mapRepository.getMapById(id, callback)   
        }

    }

}