import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import TextInputField from '../components/atoms/TextInputField';
import SecondaryButton from '../components/atoms/SecondaryButton';


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
    <Text className="text-lg font-bold flex-1 text-center">Appointment</Text>
  </View>
  </View>
  );
};



// Doctor Card Component
const DoctorCard = ({ doctor } : any) => {
  return (
    <View className="p-6 mx-4  gap-y-6">
      <View className="flex-row">
        <Image
          source={{ uri: doctor.image }}
          className="w-[77px] h-[77px] rounded-full"
        />
        <View className="ml-7 flex-1 gap-y-2">
          <Text className="text-lg text-[#151B19] font-bold">{doctor.name}</Text>
          <Text className="text-[#333D3A] font-[400] text-[12px]">{doctor.specialty}</Text>
          <View className="flex-row justify-between items-center">
          <Text className="text-yellow-400 text-center mt-1">★★★★★</Text>
          <Text className="text-[10px] font-[400] text-[#333D3A] text-center">$20 / hr</Text>
          </View>
        </View>
      </View>
 
    </View>
  );
};

// Main Doctor List Component
const DoctorList = () => {
  const doctors = [
    {
      id: 1,
      name: 'Darrell Steward',
      specialty: 'Tooths Dentist',
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',
    }
  ];

  return (
    <View className='w-[330px] bg-white rounded-lg mx-auto pb-7'>
    <FlatList
      data={doctors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <DoctorCard doctor={item} />}
    />
    </View>
  );
};

// Main App Component
const AppointmentFirstScreen = () => {
    const [patientName, setPatientName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const navigation : any = useNavigation();
  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <Header />
      
      <DoctorList />

      <Text className='font-semibold text-lg text-[#151B19] my-4 ml-4'>Appointment</Text> 
      <View className='flex-1 items-center px-5'>
       
      <TextInput
          
            className="border border-gray-300 w-full rounded-lg px-3 py-4 bg-white mb-4"
            placeholder={`Patient Name`}
            value={patientName}
            onChangeText={text => setPatientName(text)}
          />
           <TextInput
          
          className="border border-gray-300 w-full rounded-lg px-3 py-4 bg-white mb-4"
          placeholder={`Contact Number`}
          value={contactNumber}
          onChangeText={text => setContactNumber(text)}
        />
       
        <PrimaryButton text="Next" onPress={() => navigation.navigate('AppointmentSecondScreen')} />
        <SecondaryButton text="Add More" onPress={() => navigation.navigate('AppointmentFisrtScreen')} />
      

      </View>
    </SafeAreaView>
    </>
  );
};

export default AppointmentFirstScreen;
