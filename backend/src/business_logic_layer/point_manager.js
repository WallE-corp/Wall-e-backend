module.exports = function ({ pointRepository }){
     return {
         
        addPoint: function(current, x, y, callback) {
            if(!current || !x || !y){ return }
            pointRepository.addPoint(current, x, y, callback)
        }
     }
 }