const admin = require("firebase-admin")

module.exports = function () {

    return {

        /**
         * @param {Map<String, Any>[]} callback
         */
        getAllMaps: function (callback) {
            const docRef = admin.firestore().collection('maps')
            docRef.get().then((documents) => {
                if (documents.empty) {
                    callback(['documnetsNotFound'], null)
                } else {
                    let map = new Map()
                    documents.forEach(document => {
                        map.set(document.id, document.data())
                    });
                    callback(null, map)
                }
            })
        },
    }
}