const db = require('./database')
module.exports = function ({}){

     return {
          /**
           * @param {Map<String, Any>[]} callback
           */
          getAllPoints : function(callback){
               const docRef = db.firestore.collection('WallE').doc('alovelace');
                docRef.set({
               first: 'Ada',
               last: 'Lovelace',
               born: 1815
               });

          },

          /**
           * @param {String} id 
           * @param {Map<String, Any>} callback
           */
          getPointById : function(id, callback){

          },

          /**
           * @param {number} x 
           * @param {number} y
           * @param {Date} dateTime
           * @param {Map<String, Any>} callback
          */
          addPoint : function(x ,y ,dateTime, callback){
               
          }
     }

}