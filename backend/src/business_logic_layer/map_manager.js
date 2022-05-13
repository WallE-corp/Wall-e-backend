module.exports = function ({ mapRepository }) {
    return {
        getAllMaps: function (callback) {
            mapRepository.getAllMaps(callback)
        },

        createMap: function (callback) {
            const filePath = './backend/src/data_access_layer/map.json'
            const lastMapIdNumber = getNumberFromMapId(filePath) // Returns the number of the last used map.
            var mapId = "map_1"
            /*
            * Each Map Id will be "map_" and a Number after the "_". 
            * The getLastMapIdNumber will return only the number and not the hole Id.
            * I add 1 to the old id number. 
            * If I get 0 as id number from the function, I create the firstMap Id with Id map_1 
            * and send it to the mapRepository.
            */
            if (lastMapIdNumber)
                mapId = "map_" + (lastMapIdNumber + 1)

            mapRepository.createMap(mapId, (error)=>{
                if(error){
                    callback(error)
                    return
                }

                mapRepository.setLastMapId(mapId, (error)=>{
                    if (error) {
                        callback(error)
                        return
                    }
                    callback()
                })
            })

            
        },
        getNumberFromMapId: function (filePath) {
            const idAsString = mapRepository.getLastMapId(filePath)
            const numberPattern = "/\d+/g"
            var idNumber = 0
            if (idAsString)
                idNumber = parseInt(idAsString.match(numberPattern))
            return idNumber
        }

    }
}
