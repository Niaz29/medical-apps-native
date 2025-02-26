import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import SocketIOClient from 'socket.io-client';

const ProfileScreen = ({navigation} : any) => {
  const {currentUser} : any = useSelector((state : RootState) => state.auth);

  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );

  if(currentUser?.role === 'doctor'){
    const socket = SocketIOClient('http://192.168.0.109:3000', {
      transports: ['websocket'],
      query: {
        callerId,
        doctorId: currentUser?.patientOrDoctorId
      },
    });
  }

  const roleMenuItemsMap = {
    'patient' : [
      { label: 'My Doctors', icon: require('../../assets/images/doctor.png'), screen : 'Doctor' },
      { label: 'Active Doctors', icon: require('../../assets/images/doctor.png'), screen : 'ActiveDoctorListScreen' },
      { label: 'Medical Records', icon: require('../../assets/images/medical.png'), screen : 'ReportScreen' },
      { label: 'Payments', icon: require('../../assets/images/payments.png'), screen : 'PaymentHistoryScreen' },
      { label: 'My Appointments', icon: require('../../assets/images/appointment.png'), screen : 'AppointmentFisrtScreen' },
      { label: 'Maps', icon: require('../../assets/images/place.png'), screen : 'MapScreen' },
      { label: 'Call Emergency Ambulance', icon: require('../../assets/images/call.png'), screen : 'Doctor' },
      { label: 'Privacy & Policy', icon: require('../../assets/images/privacy.png'), screen : '' },
      { label: 'Log out', icon: require('../../assets/images/logout.png'), screen : 'SignIn' },
    ],
    'doctor' : [
      { label: 'Payments', icon: require('../../assets/images/payments.png'), screen : 'PaymentHistoryScreen' },
      { label: 'My Appointments', icon: require('../../assets/images/appointment.png'), screen : 'AppointmentFisrtScreen' },
      { label: 'Attach Prescription', icon: require('../../assets/images/medical.png'), screen : 'PrescriptionScreen' },
      { label: 'Patient Records', icon: require('../../assets/images/medical.png'), screen : 'PatientReport' },
      { label: 'Log out', icon: require('../../assets/images/logout.png'), screen : 'SignIn' },
    ]
  }
  return (
    <View className="flex-1 bg-gradient-to-b from-green-400 to-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-6 bg-green-500 rounded-b-xl">
        <Image
          source={{ uri: 'https://www.shutterstock.com/shutterstock/photos/2289779951/display_1500/stock-photo-happy-young-man-in-glasses-white-background-2289779951.jpg' }}
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-lg font-bold text-white">{currentUser?.username}</Text>
          <Text className="text-sm text-white">+3500000000</Text>
        </View>
       
      </View>

      {/* Menu Options */}
      <View className="mt-6">
        {roleMenuItemsMap[currentUser?.role].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={()=> item?.screen ? navigation.navigate(item?.screen) : () => {}}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200"
          >
            <View className="flex-row items-center">
            <Image source={item?.icon} />
              <Text className="ml-4 text-base text-gray-700">{item.label}</Text>
            </View>
            <Image source={require('../../assets/images/stash_arrow.png')} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProfileScreen;
