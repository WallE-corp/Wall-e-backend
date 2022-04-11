module.exports = function ({ pointRepository }){
     return {
         
        addPoint: function(mapId, current, x, y, callback) {
            if(!mapId || !current || !x || !y){ return }
            pointRepository.addPoint(mapId, current, x, y, callback)
        }
     }
 }