

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useGetAllDoctorWithStatusQuery } from '../features/education/eductionApi';
import { Loading } from '../components/moleclues/Loading';


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
  <Text className="text-lg font-bold flex-1 text-center">My Doctors</Text>
</View>
</View>
);
};

const MyDoctorList = ({ navigation }: any) => {
    const [refreshing, setRefreshing] = useState(false);

  const {data : allDoctorWithStatus, isLoading, refetch} = useGetAllDoctorWithStatusQuery(null);

  const doctors = allDoctorWithStatus?.map((doctor : any)=> (
    { id: doctor?.id, name: doctor?.user?.username, specialty: doctor?.experiences[0]?.designation, image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838', isActive: doctor?.isActive, callerId: doctor?.callerId }
  ));

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  if(isLoading){
    return <Loading/>
  }


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
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      />
    </View>
  );
};

export default MyDoctorList;