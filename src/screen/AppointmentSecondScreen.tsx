import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import TextInputField from '../components/atoms/TextInputField';
import SecondaryButton from '../components/atoms/SecondaryButton';
import CalendarComponent from '../components/atoms/Calendar';
import TimeCard from '../components/moleclues/TimeCard';
import ThankYouModal from '../components/moleclues/ThankYouModal';


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


// Main App Component
const AppointmentSecondScreen = () => {
    const [selectedHour, setSelectedHour] = useState(4);
    const [selectedMinute, setSelectedMinute] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    const navigation : any = useNavigation();

    const hourOptions = [
        {
            id : 1, title : "10.00", subtitle : 'AM'
        },
        {
            id : 2, title : "12.00", subtitle : 'AM'
        },
        {
            id : 3, title : "2.00", subtitle : 'PM'
        },
        {
            id : 4, title : "3.00", subtitle : 'PM'
        },
        {
            id : 5, title : "4.00", subtitle : 'PM'
        }
    ];

    const minuteOptions = [
        {
            id : 1, title : "10", subtitle : 'Minute'
        },
        {
            id : 2, title : "25", subtitle : 'Minute'
        },
        {
            id : 3, title : "30", subtitle : 'Minute'
        },
        {
            id : 4, title : "35", subtitle : 'Minute'
        },
        {
            id : 5, title : "40", subtitle : 'Minute'
        }
    ]
  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    
      <Header />
    <CalendarComponent/>
    <View className='px-5 mt-3'>
        <Text className='text-lg text-[#151B19] font-semibold mb-3'>Available Time</Text>
      
        <View className='flex-row justify-center items-center gap-x-3'>
        {
            hourOptions?.map((item) => (<TouchableOpacity onPress={() => setSelectedHour(item.id)} key={item.id}><TimeCard isSelected={selectedHour === item.id} title={item.title} subtitle={item.subtitle}/></TouchableOpacity>))
        }
        </View>
    </View>


    <View className='px-5 mt-3'>
        <Text className='text-lg text-[#151B19] font-semibold mb-3'>Reminder Me Before</Text>
        <View className='flex-row justify-center items-center gap-x-3'>
        {
            minuteOptions?.map((item) => (<TouchableOpacity onPress={() => setSelectedMinute(item.id)} key={item.id}><TimeCard isSelected={selectedMinute === item.id} title={item.title} subtitle={item.subtitle}/></TouchableOpacity>))
        }
        </View>
    </View>
    <View className='flex-col items-center mt-5'><PrimaryButton text="Confirm"  onPress={()=> setIsVisible(true)} /></View>
    <ThankYouModal isVisible={isVisible} setIsVisible={setIsVisible}/>
    </>
  );
};

export default AppointmentSecondScreen;
