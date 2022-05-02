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
        }
    }
}
