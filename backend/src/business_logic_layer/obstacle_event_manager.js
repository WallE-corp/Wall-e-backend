module.exports = ({  }) => {
  return {
    handle_obstacle_event: (obstacle_event_data) => {
      const {tmpImageFilePath} = obstacle_event_data
      
      // [Du Won] Store image in Cloud Storage 
      

      // [Ahmad] Begin async request to classify image

      // Create an obstacle event document in Cloud Firestore

      // notify mobile of obstacle event
    }
  } 
}