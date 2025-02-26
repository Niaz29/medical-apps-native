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

const ThankYouModal = ({isVisible, setIsVisible} : any) => {
  
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
      
        <View className="flex-col mx-auto relative top-36 justify-center w-[330px] h-[575px] items-center bg-white">
          <View className="bg-white w-4/5 rounded-2xl items-center p-6">
            {/* Icon */}
            <View className="bg-[#DAFAEE] w-[156px] h-[156px] rounded-full items-center justify-center mb-4">
              <Image source={require('../../../assets/images/like.png')}/>
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-[#151B19] mb-2">
              Thank You!
            </Text>

            {/* Description */}
            <Text className="text-center text-[#333D3AE5] text-sm mb-6">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of it over 2000 years old.
            </Text>

            <View className='w-[300px] mx-auto'>
            <PrimaryButton text="Done"  onPress={() => {navigation.navigate('RecordSelectScreen'); closeModal()}}/>
            <SecondaryButton text="Edit your appointment"  onPress={closeModal}/>
            </View>

           
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ThankYouModal;
