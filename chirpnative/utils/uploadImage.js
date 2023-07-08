import firebase from 'firebase/app';
import 'firebase/storage';

const uploadImageToFirebase = async (imageURI) => {
    try {
      // Create a reference to the Firebase Storage bucket
      const storageRef = firebase.storage().ref();
  
      // Generate a unique filename for the image
      const filename = `images/${Date.now()}`;
  
      // Upload the image file to Firebase Storage
      const response = await fetch(imageURI);
      const blob = await response.blob();
      const uploadTask = storageRef.child(filename).put(blob);
  
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle progress updates
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);
          },
          (error) => {
            // Handle upload error
            console.log('Upload error:', error);
            reject(error);
          },
          () => {
            // Handle upload success
            console.log('Upload completed');
  
            // Get the public download URL of the uploaded image
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('Download URL:', downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.log('Error uploading image:', error);
      throw error;
    }
  };
  
 
{/*
 //const imageURI = await ImagePicker.launchImageLibraryAsync();
  uploadImageToFirebase()
    .then((downloadURL) => {
      // Handle the download URL as needed
      console.log('Download URL:', downloadURL);
    })
    .catch((error) => {
      // Handle the error
      console.log('Error:', error);
    });
 */}

module.exports = uploadImageToFirebase
