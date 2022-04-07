const admin = require("firebase-admin")

module.exports = function () {

    return {

        /**
         * @param {Map<String, Any>[]} callback
         */
        getAllMaps: function (callback) {
            const docRef = admin.firestore()
            docRef.listCollections().then((collections) => {
                if (collections.empty) {
                    callback('collection does not exists', null)
                } else {
                    let map = new Map()
                    collections.forEach(collection => {
                        map.set(collection.id, "test")
                    });
                    callback(null, map)
                }
            })
        },
    }
}