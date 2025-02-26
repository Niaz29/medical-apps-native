import React from 'react';
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
    <Text className="text-lg font-bold flex-1 text-center">Doctor Details</Text>
  </View>
  </View>
  );
};



// Doctor Card Component
const DoctorCard = ({ doctor } : any) => {
  const navigation : any = useNavigation();
  return (
    <View className="p-6 mx-4 mb-4 gap-y-6 border border-b-[0.5px] border-[#CACDD4] border-t-0 border-l-0 border-r-0">
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
      <View className="w-full">
      <TouchableOpacity onPress={() => navigation.navigate('AppointmentFisrtScreen')} className="bg-[#0EBE7F]  py-3 rounded-lg">
          <Text className="text-white text-center">Book Now</Text>
        </TouchableOpacity>
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
    <View className='w-[290px] h-[74px] flex-row justify-center items-center gap-x-2 border border-[#CACDD4]  rounded-lg mx-auto'>
        <View className='w-[85px] h-[58px] bg-gray-200 rounded-xl flex-col justify-center'>
            <Text className='text-center font-[500] text-[18px] text-[#151B19]'>100</Text>
            <Text className='text-center font-[400] text-[#333D3A] text-[12px]'>Running</Text>
        </View>
        <View className='w-[85px] h-[58px] bg-gray-200 rounded-xl flex-col justify-center'>
            <Text className='text-center font-[500] text-[18px] text-[#151B19]'>500</Text>
            <Text className='text-center font-[400] text-[#333D3A] text-[12px]'>Ongoing</Text>
        </View>
        <View className='w-[85px] h-[58px] bg-gray-200 rounded-xl flex-col justify-center'>
            <Text className='text-center font-[500] text-[18px] text-[#151B19]'>700</Text>
            <Text className='text-center font-[400] text-[#333D3A] text-[12px]'>Patient</Text>
        </View>
    </View>

    <View className='w-[290px] mt-3 h-[45px] flex-row justify-center items-center gap-x-2 border border-[#CACDD4]  rounded-lg mx-auto'>
        <View className='w-[90px] h-[34px] bg-[#0EBE7F] rounded-xl flex-col justify-center'>
            <Text className='text-center font-[500] text-[#FFFFFF] text-[12px]'>Intro</Text>
        </View>
        <View className='w-[90px] h-[34px] bg-gray-200 rounded-xl flex-col justify-center'>
            <Text className='text-center font-[400] text-[#333D3A] text-[12px]'>Experience</Text>
        </View>
        <View className='w-[90px] h-[34px] bg-gray-200 rounded-xl flex-col justify-center'>
            <Text className='text-center font-[400] text-[#333D3A] text-[12px]'>Review</Text>
        </View>
    </View>
    </View>
  );
};

// Main App Component
const DoctorDetails = () => {
  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <Header  />
      
      <DoctorList />
    </SafeAreaView>
    </>
  );
};

export default DoctorDetails;
