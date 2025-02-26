import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useGetAllDoctorWithStatusQuery } from '../features/education/eductionApi';


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
  <Text className="text-lg font-bold flex-1 text-center">Active Doctors</Text>
</View>
</View>
);
};

const ActiveDoctorListScreen = ({ navigation }: any) => {

  const {data : allDoctorWithStatus} = useGetAllDoctorWithStatusQuery(null);

  const doctors = allDoctorWithStatus?.map((doctor : any)=> (
    { id: doctor?.id, name: doctor?.user?.username, specialty: doctor?.experiences[0]?.designation, image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: doctor?.isActive, callerId: doctor?.callerId }
  ));

  // const doctors = [
  //   { id: '1', name: 'Dr. Sarah Johnson',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '2', name: 'Dr. James Smith',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '3', name: 'Dr. Emily Davis', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '4', name: 'Dr. Michael Brown', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '5', name: 'Dr. Sarah Johnson',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '6', name: 'Dr. James Smith',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '7', name: 'Dr. Emily Davis', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '8', name: 'Dr. Michael Brown', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '9', name: 'Dr. Sarah Johnson',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '10', name: 'Dr. James Smith',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '11', name: 'Dr. Emily Davis', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '12', name: 'Dr. Michael Brown', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '13', name: 'Dr. Sarah Johnson',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '14', name: 'Dr. James Smith',specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: false },
  //   { id: '15', name: 'Dr. Emily Davis', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: true },
  //   { id: '16', name: 'Dr. Michael Brown', specialty: 'Tooths Dentist', image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: false },
  // ];

  const renderDoctor = ({ item } : any) => {
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', {username : item.name, callerId : item?.callerId })} className="flex-row items-center p-4 border-b border-gray-200">
        {/* Doctor Image */}
        <Image
          source={{ uri: item.image }}
          className="h-12 w-12 rounded-full mr-4"
        />

        {/* Doctor Details */}
        <View className="flex-1">
          <Text className="text-lg font-bold text-black">{item.name}</Text>
          <Text className="text-sm text-gray-500">{item.specialty}</Text>
        </View>

        {/* Active/Inactive Indicator */}
        <View
          className={`h-4 w-4 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-red-500'}`}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
     <Header/>

      {/* Doctor List */}
      <FlatList
        data={doctors}
        keyExtractor={item => item.id}
        renderItem={renderDoctor}
        className="flex-1 bg-white"
      />
    </View>
  );
};

export default ActiveDoctorListScreen;