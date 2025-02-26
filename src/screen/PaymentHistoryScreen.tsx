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
    <Text className="text-lg font-bold flex-1 text-center">Payment History</Text>
  </View>
  </View>
  );
};


// Main App Component
const PaymentHistoryScreen = () => {
    const navigation : any = useNavigation();
  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <Header />

      <View className='flex flex-col gap-y-6 mt-24'>
      <View className='relative'>
      <View className='w-[330px] px-5 h-[52px] rounded-xl bg-white border border-[#67729429] flex-row items-center mx-auto justify-between'>
        <Text className='text-sm text-[#333D3A] font-normal'>06 Month Payment</Text>
        <TouchableOpacity >
        <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/left-arrow.png')} />
        </TouchableOpacity>

      </View>
      <Text className='absolute bottom-3/4 right-14 w-[39px] h-[18px] pt-1 text-center rounded-lg bg-[#DAFAEE] text-[8px] text-[#333D3A] font-normal'>Action</Text>
      </View>

    <View className='relative'>
    <View className='w-[330px] px-5 h-[52px] rounded-xl bg-white border border-[#67729429] flex-row items-center mx-auto justify-between'>
        <Text className='text-sm text-[#333D3A] font-normal'>01 Month Payment</Text>
        <TouchableOpacity>
        <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/left-arrow.png')} />
        </TouchableOpacity>

      </View>
      <Text className='absolute bottom-3/4 right-14 w-[39px] h-[18px] pt-1 text-center rounded-lg bg-[#DAFAEE] text-[8px] text-[#333D3A] font-normal'>Expire</Text>
    </View>
      </View>
     
    </SafeAreaView>
    </>
  );
};

export default PaymentHistoryScreen;
