const admin = require("firebase-admin")

module.exports = function () {

    return {

        /**
         * @param {Map<String, Any>[]} callback
         */
        getAllMaps: function (callback) {
            const docRef = admin.firestore().collection('maps')
            docRef.get().then((collections) => {
                if (collections.empty) {
                    callback('collection does not exists', null)
                } else {
                    let map = new Map()
                    collections.forEach(collection => {
                        map.set(collection.id, collection.data())
                    });
                    callback(null, map)
                }
            })
        },
    }
}