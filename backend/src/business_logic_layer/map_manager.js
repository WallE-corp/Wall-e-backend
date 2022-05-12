module.exports = function ({ mapRepository }) {
    return {
        getAllMaps: function (callback) {
            mapRepository.getAllMaps(callback)
        },

        createMap: function (callback) {
            const filePath = './backend/src/data_access_layer/map.json'
            const lastMapIdNumber = getLastMapIdNumber(filePath) // Returns the number of the last used map.
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

            const id = JSON.stringify(mapId, null, 2);
            fs.writeFile(filePath, id, (error) => {
                if (error) {
                    callback('CouldNotWriteToFile', null)
                    return
                }
                mapRepository.createMap(mapId, callback)
            })

        },

        getLastMapId: function (filePath) {
            const data = fs.readFileSync(filePath)
            const id = data.id
            if (id)
                return JSON.parse(id)
            return
        },
        getLastMapIdNumber: function (filePath) {
            const idAsString = getLastMapId(filePath)
            const numberPattern = "/\d+/g"
            var idNumber = 0
            if (idAsString)
                idNumber = parseInt(idAsString.match(numberPattern))
            return idNumber
        }
    }
}
