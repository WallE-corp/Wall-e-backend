module.exports = function ({ pointRepository }){
     return {
         
        addPoint: function(mapId, x, y, callback) {
            if(!mapId || !x || !y){ return }
            pointRepository.addPoint(mapId, x, y, callback)
        }
     }
 }