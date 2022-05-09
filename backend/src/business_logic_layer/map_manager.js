module.exports = function ({ mapRepository }) {
    return {
        getAllMaps: function (callback) {
            mapRepository.getAllMaps(callback)
        },

        createMap: function (callback) {
            const lastMapIdNumber = getLastMapIdNumber() // Returns the number of the last used map.
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
            mapRepository.createMap(mapId, callback)

        },
        getLastMapId: function () {
            const filePath = './backend/src/data_access_layer/map.json'
            const data = fs.readFileSync(filePath)
            if (data)
                return JSON.parse(data)
            return
        },
        getLastMapIdNumber: function () {
            const idAsString = getLastMapId()  // This function returns the Last Map Id, that should be saved in a JSON file
            const numberPattern = "/\d+/g"
            var idNumber = 0
            if (idAsString)
                idNumber = parseInt(idAsString.match(numberPattern))
            return idNumber
        }
    }
}
