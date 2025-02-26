import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useNavigation } from '@react-navigation/native';



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
    <Text className="text-lg font-bold flex-1 text-center">Medical Records</Text>
  </View>
  </View>
  );
};


// Main App Component
const RecordSelectScreen = () => {
    const navigation : any = useNavigation();
  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <Header />
      <View className='flex-1 h-screen justify-center items-center flex-col gap-y-2'>
      <PrimaryButton
        text="Prescription"
        onPress={() => navigation.navigate('PrescriptionScreen')}
      />
      <Text className='mx-auto text-lg font-normal text-[#373B46]'>Or</Text>
      <PrimaryButton
        text="Report"
        onPress={() => navigation.navigate('ReportScreen')}
      />
      </View>
    </SafeAreaView>
    </>
  );
};

export default RecordSelectScreen;
