import React, { useState } from 'react';
import { View, Button, Image, TextInput, Text, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const UploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');


  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true, // Saves to gallery
    };

    try {
      const result = await launchCamera(options);

      if (result.didCancel) {
        console.log('User cancelled camera');
      } else if (result.errorCode) {
        console.log('Camera Error:', result.errorMessage);
      } else {
        setImageUri(result.assets?.[0]?.uri || null);
      }
    } catch (error) {
      console.log('Error launching camera:', error);
    }
  };


  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('Image Picker Error:', result.errorMessage);
    } else {
      setImageUri(result.assets?.[0]?.uri || null);
    }
  };

  const handleUpload = async () => {
    if (!imageUri || !name) {
      Alert.alert('Error', 'Please select an image and enter a name.');
      return;
    }

    const formData = new FormData();
    // formData.append('name', name);
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust according to your file type
      name: 'photo.jpg',
    });

    try {
      const response = await fetch('https://medical-app.online/s3/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const json = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Image uploaded successfully!');
        console.log('Upload Response:', json);
      } else {
        Alert.alert('Upload Failed', json.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Upload Failed', 'Network request failed.');
      console.error('Upload Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Open Camera" onPress={openCamera} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, width: '80%', marginTop: 20, padding: 8 }}
      />
      
      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
};

export default UploadScreen;
