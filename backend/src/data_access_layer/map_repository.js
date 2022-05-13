const admin = require("firebase-admin")


module.exports = function ({ db }) {
    return {

        /**
         * @param {Map<String, Any>[]} callback
         */
        getAllMaps: function (callback) {
            const docRef = db.collection('maps')
            docRef.get().then((documents) => {
                if (documents.empty) {
                    callback(['documnetsNotFound'], null)
                } else {
                    const map = new Map()
                    documents.forEach(document => {
                        map.set(document.id, document.data())
                    })
                    callback(null, map)
                }
            })
        },     
        getLastMapId: function (filePath) {
            const data = fs.readFileSync(filePath)
            const id = data.id
            if (id)
                return JSON.parse(id)
            return
        },        
        getMapById: function (id, callback) {
            const docRef = db.collection('maps')
            docRef.doc(id).get().then((document) => {
                if (document.empty) {
                    callback(['documnetNotFound'], null)
                } else {
                    const map = new Map()
                    map.set(document.data())
                    callback(null, map)
                }
            })
        },
        setLastMapId: function(mapId,callback){

            const id = JSON.stringify(mapId, null, 2);
            fs.writeFile(filePath, id, callback)
        },

        createMap: function(mapId, callback){
            const docRef = admin.firestore().collection('maps').doc(mapId)
            docRef.set({
                PathPoints:[],
                Obstacles: []
            }).then(() => {

             callback(null)
         }).catch((error) => {
             callback(error)
         })
        }
    }
}
