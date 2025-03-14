import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import SocketIOClient from 'socket.io-client';
import { userLoggedOut } from '../features/auth/authSlice';
import { BASE_URL } from '../constants/apiEndpoints';
import { removeData } from '../utils/AsyncStorageService';

const ProfileScreen = ({navigation} : any) => {
  const {currentUser} : any = useSelector((state : RootState) => state.auth);
  const dispatch = useDispatch();
  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );

  if(currentUser?.role === 'doctor'){
    const socket = SocketIOClient(`${BASE_URL}`, {
      transports: ['websocket'],
      query: {
        callerId,
        doctorId: currentUser?.patientOrDoctorId
      },
    });
  }

  const roleMenuItemsMap = {
    'patient' : [
      { label: 'My Doctors', icon: require('../../assets/images/doctor.png'), screen : 'MyDoctorList' },
      { label: 'Active Doctors', icon: require('../../assets/images/check.png'), screen : 'ActiveDoctorListScreen' },
      { label: 'Medical Records', icon: require('../../assets/images/medical.png'), screen : 'ReportScreen' },
      { label: 'My Prescriptions', icon: require('../../assets/images/prescription.png'), screen : 'PatientReport' },
      { label: 'Payments', icon: require('../../assets/images/payments.png'), screen : 'PaymentHistoryScreen' },
      { label: 'My Appointments', icon: require('../../assets/images/appointment.png'), screen : 'PatientAppointment' },
      { label: 'Maps', icon: require('../../assets/images/map.png'), screen : 'MapScreen' },
      { label: 'Call Emergency Ambulance', icon: require('../../assets/images/call.png'), screen : 'Doctor' },
      { label: 'Privacy & Policy', icon: require('../../assets/images/privacy.png'), screen : '' },
      { label: 'Log out', icon: require('../../assets/images/logout.png'), screen : 'Wellcome' },
    ],
    'doctor' : [
      { label: 'Payments', icon: require('../../assets/images/payments.png'), screen : 'PaymentHistoryScreen' },
      { label: 'My Appointments', icon: require('../../assets/images/appointment.png'), screen : 'DoctorAppointment' },
      { label: 'Attach Prescription', icon: require('../../assets/images/medical.png'), screen : 'PrescriptionScreen' },
      { label: 'Log out', icon: require('../../assets/images/logout.png'), screen : 'Wellcome' },
    ]
  }
  return (
    <View className="flex-1 bg-gradient-to-b from-green-400 to-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-6 bg-green-500 rounded-b-xl">
     
        <View className="ml-4">
          <Text className="text-lg font-bold text-white">{currentUser?.username}</Text>
          <Text className="text-sm text-white">{currentUser?.email}</Text>
        </View>
       
      </View>

      {/* Menu Options */}
      <View className="mt-6">
        {roleMenuItemsMap[currentUser?.role]?.map((item : any, index : number) => (
          <TouchableOpacity
            key={index}
            onPress={async()=>{
              if(item?.screen){
                if(item?.label==='Log out'){
                  dispatch(userLoggedOut());
                  await removeData('MEDICAL_AUTH');
                  navigation.navigate('Wellcome');
                }else{
                  navigation.navigate(item?.screen);
                }
                
              }
            }}
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
