import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import TimeCard from '../components/moleclues/TimeCard';



// Header Component
const Header = () => {
    const navigation = useNavigation();
  return (
    <View className=' px-3 py-7'>
    <View className="flex-row items-center mt-3">
    <TouchableOpacity onPress={() => navigation.goBack()}>
      {/* Replace this text with an icon if needed */}
      <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
    </TouchableOpacity>
    <Text className="text-lg font-bold flex-1 text-center">Document</Text>
  </View>
  </View>
  );
};

const RecordCard = () => {

  return (
    <View>
    <View className='flex-row gap-x-6 border-b-[0.5px] border-[#CACDD4] pb-7'>

      <View className='relative'>
        <TimeCard title="05" subtitle="DEC" isSelected={true}/>
        <Text className='absolute top-3/4 left-4 w-[33px] h-[18px] pt-1 text-center rounded-lg bg-[#DAFAEE] text-[8px] text-[#333D3A] font-normal'>New</Text>
      </View>

      <View className='flex w-[177px] flex-col gap-y-2'>

        <Text className='text-base text-[#151B19] font-semibold'>Records added by you</Text>
        <Text className='text-xs text-[#333D3A] font-normal'>Record for Niaz</Text>
        <Text className='text-xs text-[#333D3A] font-normal'>01 Prescription</Text>
        
      </View>

      <View>
      <Image className='w-[20px] h-[20px]' source={require('../../assets/images/Meatballs_menu.png')}/>
      </View>

    </View>
    
    </View>
  )
}


// Main App Component
const AttachPrescriptionScreen = () => {
    const navigation : any = useNavigation();
  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <Header />
      <View className='w-[330px] bg-white rounded-lg p-4 mx-auto'>
    
   
     
     <View className='flex justify-center items-center mt-6'>
     <PrimaryButton
        text="Add a Record"
        onPress={() => navigation.navigate('PrescriptionScreen')}
      />
     </View>
      
      </View>
    </SafeAreaView>
    </>
  );
};

export default AttachPrescriptionScreen;
