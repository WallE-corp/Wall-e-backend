module.exports = function ({ pointRepository }){
     return {
         
        addPoint: function(time, date, imagePath, cordinates, callback) {
            if(!time || !date || !imagePath || !x || !y){ return }
            pointRepository.addPoint(time, date, imagePath, cordinates, callback)
        }
     }
 }