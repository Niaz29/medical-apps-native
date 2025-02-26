import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../components/atoms/PrimaryButton';
import SecondaryButton from '../components/atoms/SecondaryButton';
import { useCreateHealthStatusMutation } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';

const HealthStatusScreen = ({ navigation }: any) => {
  const [doseFields, setDoseFields] = useState([{ id: 1, value: '' }]); // Store dose fields
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);

  const [createHealthStatus] = useCreateHealthStatusMutation()

  const healthOptions = [
    {
        id : 1, title : "Smoking Status", value : 'smokingStatus'
    },
    {
        id : 2, title : "Exercise", value : 'exercise'
    },
    {
        id : 3, title : 'Alcohol Status', value: 'alcoholStatus'
    },
    {
        id : 4, title : 'Diabetics Status', value : 'diabeticsStatus'
    },
    {
        id : 5, title : 'Covid Vaccination', value : 'covidVaccination'
    },
    {
      id : 6, title : 'Allergy', value : 'allergy'
  }
];


  const handleSelectStatus = (id: number) => {
    let updatedData = [];
    if(selectedStatus.includes(id)){
      updatedData = selectedStatus?.filter((item) => item !== id);

    }else{
      updatedData = [...selectedStatus, id]
    }
    setSelectedStatus(updatedData);
  }

  const handleSubmit = async () => {


    const healthStatusData = healthOptions?.reduce((acc : any, curr : any) => {
      if(selectedStatus?.includes(curr?.id)){
        acc[curr?.value] = true
      }else{
        acc[curr?.value] = false;
      }
      
      return acc;
    }, {});
    
    try {
      const res = await createHealthStatus(healthStatusData);
      if (res?.data?.status) {
        tostify({ type: 'success', title: 'Success', subTitle: res?.data?.message });
     
        navigation.navigate('ProfileScreen')
      } else {
        
        tostify({ type: 'info', title: 'Info', subTitle: res?.data?.message || 'Something went wrong!' });
      }
    } catch (err) {
      console.log(err);
      tostify({ type: 'error', title: 'Error', subTitle: 'Something went wrong!' });
    }
  };

  return (
    <ScrollView className="flex-1 bg-blue-50 px-4">
      {/* Header with Back Icon */}
      <View className="flex-row items-center mt-3 mb-32">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Replace this text with an icon if needed */}
          <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center">Health Status</Text>
      </View>


      <View className="flex flex-row flex-wrap gap-2 px-3 mb-3">
        {
          healthOptions?.map((item) => ( <TouchableOpacity onPress={() => handleSelectStatus(item.id)} key={item?.id} className={`${selectedStatus?.includes(item.id) ? 'bg-[#0EBE7F]' : 'bg-white'} px-6 py-4 rounded-xl self-start`}>
            <Text className={`text-base ${selectedStatus?.includes(item.id) ? 'text-white' : 'text-black'}`}>{item?.title}</Text>
          </TouchableOpacity>))
        }
     
     
      
    </View>

      {/* Next Button */}
      <View className="flex-1 items-center">
        <PrimaryButton text="Done" onPress={handleSubmit}  />
        
      </View>
    </ScrollView>
  );
};



export default HealthStatusScreen;
