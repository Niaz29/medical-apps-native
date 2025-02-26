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

const DocumentViewModal = ({isVisible, setIsVisible, imageUri} : any) => {
  
  const navigation : any = useNavigation();
  const closeModal = () => {
    setIsVisible(false);
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


          <Image className='w-40 h-40' source={{ uri: imageUri }}/>

          <View className='w-[300px] mx-auto'>
            <SecondaryButton text="Close"  onPress={closeModal}/>
            </View>
           
          </View>
        </View>
    
      
      </Modal>
    </View>
  );
};

export default DocumentViewModal;
