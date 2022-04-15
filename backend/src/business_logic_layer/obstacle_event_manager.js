module.exports = ({ obstacleImageRepository }) => {
  return {
    handle_obstacle_event: (obstacle_event_data) => {
      const {tmpImageFilePath} = obstacle_event_data
      console.log(obstacle_event_data);

      // Begin async request to classify image

      // Store image in Cloud Storage
      obstacleImageRepository.uploadImage(tmpImageFilePath)
      // Create an obstacle event document in Cloud Firestore

      // await async request to classify image
      // update obstacle event document with classification result

      // notify mobile of obstacle event
    }
  } 
}