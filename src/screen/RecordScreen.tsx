import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../components/atoms/PrimaryButton';
import SecondaryButton from '../components/atoms/SecondaryButton';
import { Controller, useForm } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import ChooseFileModal from '../components/moleclues/ChooseFileModal';
import { useGetAllDoctorQuery, useGetAllPatientQuery } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';
import { getDataJSON } from '../utils/AsyncStorageService';
import TextInputField from '../components/atoms/TextInputField';
import { BASE_URL } from '../constants/apiEndpoints';


// Zod validation schema
const medicationSchema = z.object({
    title: z.string()
});


const RecordScreen = ({ navigation }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [endDate, setEndDate] = useState(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(medicationSchema)
  });


  const handleDateChange = (selectedDate : any) => {
    setEndDate(selectedDate);
    setShowEndDatePicker(false);
  };

  const onSubmit = async (data: any) => {
    if (!imageUri) {
      tostify({ type: 'error', title: 'Error', subTitle: 'Please select an image.' });
      return;
    }
  

    
    const formData = new FormData();
    formData.append('title', data?.title);
    formData.append('reportDate', endDate ? new Date(endDate).toISOString() : new Date().toISOString());
  
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust according to your file type
      name: `prescription_${Date.now()}.jpg`,
    } as any); // Cast to `any` if TypeScript complains
  
    const user = await getDataJSON('MEDICAL_AUTH');

    formData.append('patientId', user?.currentUser?.patientOrDoctorId);
  
    try {
      const response = await fetch(`${BASE_URL}/report`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      
      const json = await response.json();
  
      if (response.ok) {
        tostify({ type: 'success', title: 'Success', subTitle: 'Successfully created report!' });
        setImageUri(null);
        setEndDate(null);
        reset();
        navigation.navigate('ReportScreen')
      } else {
        tostify({ type: 'error', title: 'Error', subTitle: json.message || 'Something went wrong!' });
    
      }
    } catch (error) {
      tostify({ type: 'error', title: 'Error', subTitle: 'Network request failed!' });
      console.error('Upload Error:', error);
    }
  };
  

  return (
    <ScrollView className="flex-1 bg-blue-50 px-4">
      {/* Header with Back Icon */}
      <View className="flex-row items-center mt-3 mb-20">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Replace this text with an icon if needed */}
          <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center">Record</Text>
      </View>
      
   <View className='flex justify-center items-center w-full'>

   <Controller
      control={control}
      name="title"
      render={({ field: { onChange, value } }) => (
        <TextInputField placeholder="Title" value={value} onChangeText={onChange} isError={!!errors.title}/>
      )}
    />
      
    <View className='w-full ml-24'>
    {errors.title && <Text className='text-red-500'>{errors.title.message as string}</Text>}
    </View>
   </View>

      {/* Dynamic Dose Input Fields */}
    <View className='w-[80%] mx-auto'>

        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          className="flex-1 border border-gray-300 rounded-lg p-3 bg-white mb-7"
        >
          <Text className={endDate ? 'text-black' : 'text-gray-400'}>
            {endDate ? endDate?.toDateString() : 'Report Date'}
          </Text>
          <Text style={{ position: 'absolute', right: 10, top: '50%' }}> <Image className=' mx-3' source={require('../../assets/images/down-arrow.png')} /></Text>
        </TouchableOpacity>
    </View>

      {/* Show Date Picker for End Date */}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange( date)}
        />
      )}

      <View className='flex-1 items-center mb-3'>
      <PrimaryButton text="Select File" onPress={()=> setIsVisible(true)} />
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20, marginBottom : 20, marginHorizontal : 'auto' }} />}

      {/* Next Button */}
      <View className="flex-1 items-center">
        <PrimaryButton text="Done" onPress={handleSubmit(onSubmit)} />
      </View>
      <ChooseFileModal isVisible={isVisible} setIsVisible={setIsVisible} setImageUri={setImageUri}/>
    </ScrollView>
  );
};

export default RecordScreen;
