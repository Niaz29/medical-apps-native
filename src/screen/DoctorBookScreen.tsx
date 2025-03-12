import React from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { useGetAllDoctorQuery } from '../features/education/eductionApi';
import { Loading } from '../components/moleclues/Loading';

// Search Bar Component
const SearchBar = () => {
  return (
    <View className="px-4 mt-4">
      <View className="flex-row w-full h-[52px] items-center bg-white rounded-lg shadow">
        <TextInput
          className="flex-1 px-4 py-2 text-gray-700"
          placeholder="Search..."
        />
        <TouchableOpacity className="px-4">
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// Header Component
const Header = ({navigation} : any) => {
  return (
    <View className=' px-3 py-7'>
    <View className="flex-row items-center mt-3">
    <TouchableOpacity onPress={() => navigation.goBack()}>
      {/* Replace this text with an icon if needed */}
      <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
    </TouchableOpacity>
    <Text className="text-lg font-bold flex-1 text-center">Find Doctor</Text>
  </View>
  <SearchBar/>
  </View>
  );
};



// Doctor Card Component
const DoctorCard = ({ doctor , navigation}) => {
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
          <Text className="text-[#333D3A] font-[400] text-[12px]">{doctor.experience}</Text>
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-3">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-1"></View>
              <Text className="text-sm text-gray-600">{doctor.rating}%</Text>
            </View>
            <View className="w-2 h-2 bg-green-500 rounded-full mr-2"></View>
            <Text className="text-sm text-gray-600">{doctor.patientStories} Patient Stories</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text className="text-red-400 text-lg">❤️</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between ">
        <View>
        <Text className="text-sm font-semibold text-[#0EBE7F]">Next Available</Text>
        <Text className="text-sm font-[400] text-[#333D3A]">10:00 AM Tomorrow</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AppointmentFisrtScreen', {id : doctor?.id, name : doctor.name, specialty: doctor.specialty})} className="bg-[#0EBE7F] px-6 py-3 rounded-lg">
          <Text className="text-white">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Doctor List Component
const DoctorList = ({navigation} :any) => {
  const {data, isLoading} = useGetAllDoctorQuery(null);
  const allDoctor = data?.map((item : any) => {
    return {
      id : item?.id,
      name: item?.user?.username,
      rating : (Math.random() * 10).toFixed(1),
      experience: '07 Years experience',
      specialty: item?.experiences[0]?.designation,
      patientStories: (Math.random() * 100).toFixed(1),
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838'
    }
  });
  const doctors = [
    {
      id: 1,
      name: 'Darrell Steward',
      specialty: 'Tooths Dentist',
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',
    },
    {
      id: 2,
      name: 'Darrell Steward',
      specialty: 'Tooths Dentist',
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',
    },
    {
      id: 3,
      name: 'Darrell Steward',
      specialty: 'Tooths Dentist',
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',
    },
    {
      id: 4,
      name: 'Darrell Steward',
      specialty: 'Tooths Dentist',
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',
    },
    {
      id: 5,
      name: 'Darrell Steward',
      specialty: 'Tooths Dentist',
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',
    },
    {
      id: 6,
      name: 'Darrell Steward',
      specialty: 'Tooths Dentist',
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',
    },
  ];

  if (isLoading) {
    return <Loading/>
  }

  return (
    <View className='w-[330px] bg-white rounded-lg mx-auto pb-5'>
    <FlatList
      data={allDoctor || []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <DoctorCard doctor={item} navigation={navigation}/>}
    />
    </View>
  );
};

// Main App Component
const DoctorBookScreen = ({navigation} : any) => {
  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <Header navigation={navigation} />
      
      <DoctorList navigation={navigation}/>
    </SafeAreaView>
    </>
  );
};

export default DoctorBookScreen;
