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
        }
    }
}
