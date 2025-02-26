import React from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useGetAllDoctorQuery } from '../features/education/eductionApi';


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
const Header = () => {
  return (
    <View className='bg-[#0EBE7F] px-3 py-6 rounded-b-3xl'>
    <View className="flex-row justify-between items-center px-4">
      <View>
        <Text className="text-white text-sm font-[400] mb-2">Hi Niaz!</Text>
        <Text className="text-white text-2xl font-bold">Find Your Doctor</Text>
      </View>
      <Image
        source={{ uri: 'https://www.shutterstock.com/shutterstock/photos/2289779951/display_1500/stock-photo-happy-young-man-in-glasses-white-background-2289779951.jpg' }}
        className="w-10 h-10 rounded-full"
      />
    </View>
    <SearchBar/>
    </View>
  );
};



// Category Icons Component
const CategoryIcons = () => {
  const categories = [
    { id: 1, icon: '🦷', color: 'bg-green-200' },
    { id: 2, icon: '❤️', color: 'bg-green-200' },
    { id: 3, icon: '👁️', color: 'bg-green-200' },
    { id: 4, icon: '👶', color: 'bg-green-200' },
    { id: 5, icon: '👁️', color: 'bg-green-200' },
    { id: 6, icon: '👶', color: 'bg-green-200' },
  ];
  return (
    <View className="flex-row justify-around mt-6 px-6">
         <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View
              key={item.id}
              className={
                'w-[80px] h-[80px] rounded-lg flex items-center mr-2 justify-center bg-[#0EBE7F]'}
            >
              <Text className="text-3xl">{item.icon}</Text>
            </View>
          )}
      />

    </View>
  );
};

// Popular Doctors Component
const PopularDoctors = ({navigation}:any) => {

  const {data} = useGetAllDoctorQuery(null);

  const popularDoctors = data?.map((item:any)=> {
    return  { id: item?.id, name: item?.user?.username, specialty: item?.experiences[0]?.designation, image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838' }
  });

  return (
    <View className="px-6 mt-8">
      <Text className="text-[20px] font-[600] text-[#151B19] mb-6">Popular Doctor</Text>
      <FlatList
        horizontal
        data={popularDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DoctorBook')} >
            <View className="mr-4 bg-white rounded-lg shadow w-[184px] h-[209px]">
            <Image source={{ uri: item.image }} className="w-full h-[128px] rounded-t-lg" />
          <View className=''>
          <Text className="text-[18px] text-center font-[600] text-[#151B19] mt-2">{item.name}</Text>
            <Text className="text-xs font-[400] text-center text-[#333D3A]">{item.specialty}</Text>
            <Text className="text-yellow-400 text-center mt-1">★★★★★</Text>
          </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Doctor On Component
const DoctorsList = ({navigation} : any) => {
  const {data} = useGetAllDoctorQuery(null);

  const allDoctor = data?.map((item : any) => {
    return {
      id : item?.id,
      name: item?.user?.username,
      rating : (Math.random() * 10).toFixed(1),
      price : Math.round(Math.random() * 100),
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838'
    }
  })

  return (
    <View className="px-6 mt-6">
       <Text className="text-[20px] font-[600] text-[#151B19] mb-6">Doctor On</Text>
      <FlatList
      horizontal
        data={allDoctor}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> navigation.navigate('DoctorDetails')}>
            <View className="flex-col mr-4 justify-center bg-white rounded-2xl w-[113px] h-[153px] shadow  mb-4">
            <View className='flex-row items-center justify-between p-2'>
                <View className='flex-row items-center gap-2'>
                    <Text className="text-[#F6D060] text-lg">★</Text>
                    <Text className="text-[#333D3A] text-[10px] font-[600]">{item.rating}</Text>
                </View>
                <TouchableOpacity>
              <Text className="text-red-400 text-sm">❤️</Text>
            </TouchableOpacity>
            </View>
            <Image source={{ uri: item.image }} className="w-[56px] h-[56px] rounded-full mx-auto my-2" />
            <View className=" flex-1">
              <Text className="text-[12px] font-[600] text-[#151B19] text-center">{item.name}</Text>
              <Text className="text-[10px] font-[400] text-[#333D3A] text-center">${item?.price} / hr</Text>
            </View>

          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Main App Component
const DoctorScreen = ({ navigation }: any) => {
  return (
    
    <View className="flex-1 bg-gray-100">
      <ScrollView>
      <Header />
      <CategoryIcons />
      <PopularDoctors navigation={navigation}/>
      
      <DoctorsList navigation={navigation}/>
      </ScrollView>
    </View>
   
  );
};

export default DoctorScreen;
