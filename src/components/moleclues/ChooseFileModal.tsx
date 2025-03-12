import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ChooseFileModal = ({isVisible, setIsVisible, setImageUri} : any) => {
  
  const navigation : any = useNavigation();
  const closeModal = () => {
    setIsVisible(false);
  };

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
    const result = await launchImageLibrary({ mediaType: 'photo'});

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('Image Picker Error:', result.errorMessage);
    } else {
      setImageUri(result.assets?.[0]?.uri || null);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
     

      {/* Modal */}
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
      
        <View className="flex-col mx-auto relative top-72 justify-center w-[330px] h-[275px] items-center bg-white">
          <View className="bg-white w-4/5 rounded-2xl items-center p-6">


          <View className='flex flex-row gap-x-3 justify-between items-center'>
          <TouchableOpacity onPress={openCamera} className="bg-[#146d4c] w-[70px] h-[70px] rounded-full items-center justify-center mb-4">
          <Icon name="video-camera" size={20} color="white" />
            </TouchableOpacity>


          <TouchableOpacity onPress={pickImage} className="bg-[#146d4c] w-[70px] h-[70px] rounded-full items-center justify-center mb-4">
          <Icon name="file-photo-o" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className='w-[300px] mx-auto'>
            <SecondaryButton text="Close"  onPress={closeModal}/>
            </View>
           
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChooseFileModal;
