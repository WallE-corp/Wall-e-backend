const { connectStorageEmulator, ref, uploadBytes } = require('firebase/storage')
const admin = require('firebase-admin')
const { open } = require('fs/promises')
const path = require('path')

module.exports = () => {
  return {
    uploadImage: async (imagePath) => {
      const storage = admin.storage().bucket('gs://flash-chat-acb18.appspot.com/')
      connectStorageEmulator(storage, 'localhost', 60002)

      // Create a reference to the file we want to download
      const storageRef = ref(storage)

      const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
      uploadBytes(storageRef, bytes).then((snapshot) => {
        console.log('Uploaded an array!');
      });

      
    }
  }
}