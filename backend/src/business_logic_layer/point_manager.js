
module.exports = function ({ pointRepository }){
     return {
       
        getAllPathPoints: function (callback) {
            pointRepository.getAllPathPoints(callback)
        },

        /**
         * @param {Map<Object, number>} coordinates
         * @param {String} mapId 
         * @param {void} callback 
         */
        getPointByCoordinateManager: function(mapId,coordinates, callback){
            if(mapId.length == 0) callback('InvalidMapId',null)
            else if(( coordinates.x && coordinates.y )){
                pointRepository.getPointByCoordinate(mapId,coordinates,callback)
            }else{
                callback('InvalidCoordinates',null)
            }
        }

     }
 
 }
