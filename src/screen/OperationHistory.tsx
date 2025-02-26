import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../components/atoms/PrimaryButton';
import SecondaryButton from '../components/atoms/SecondaryButton';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateOperationHistoryMutation } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';

// Zod validation schema
const OperationSchema = z.object({
  descriptions: z.array(z.string().min(1, 'Description cannot be empty'))
});

const OperationHistoryScreen = ({ navigation }: any) => {
  const [doseFields, setDoseFields] = useState([{ id: 1, value: '' }]); // Store dose fields
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(OperationSchema)
  });

  const [createOperationHistory] = useCreateOperationHistoryMutation()

  const handleAddAnotherDose = () => {
    setDoseFields([...doseFields, { id: doseFields.length + 1, value: '' }]); // Add new dose field
  };

 
  const handleDateChange = (event, selectedDate, type) => {
    if (type === 'start') {
      setStartDate(selectedDate);
      setShowStartDatePicker(false);
    } else if (type === 'end') {
      if(startDate < selectedDate){
        setEndDate(selectedDate);
      }
      setShowEndDatePicker(false);
    }
  };

  const onSubmit = async (data : any) => {
    
    try {
      const res = await createOperationHistory({descriptions : data?.descriptions, startDate, endDate} );
      if (res?.data?.status) {
        tostify({ type: 'success', title: 'Success', subTitle: res?.data?.message });
        reset();
        setStartDate(null);
        setEndDate(null);
        navigation.navigate('HealthStatus')
      } else {
        
        tostify({ type: 'info', title: 'Info', subTitle: res?.data?.message || 'Something went wrong!' });
      }
    } catch (err) {
      console.log(err);
      tostify({ type: 'error', title: 'Error', subTitle: 'Something went wrong!' });
    }
  };

  return (
    <ScrollView className="flex-1 bg-blue-50 px-4 ">
      {/* Header with Back Icon */}
      <View className="flex-row items-center mt-3 mb-24">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Replace this text with an icon if needed */}
          <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center">Operation History</Text>
      </View>

      <View>
        {doseFields.map((doseField, index) => (
          <Controller
            key={doseField.id}
            control={control}
            name={`descriptions.${index}`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white mb-4"
                placeholder={`Description ${index + 1}`}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        ))}
        {errors.descriptions && <Text className="text-red-500">{errors.descriptions[0].message}</Text>}
      </View>

      {/* Add Another Section */}
      <TouchableOpacity onPress={handleAddAnotherDose} className="flex-row items-center justify-end mb-4">
        <Text className="text-green-600 font-bold">+ Add another</Text>
      </TouchableOpacity>

      {/* Start Date and End Date in One Row */}
      <View className="flex-row justify-between mb-60">
        {/* Start Date */}
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          className="flex-1 border border-gray-300 rounded-lg p-3 bg-white mr-2"
        >
          <Text className={startDate ? 'text-black' : 'text-gray-400'}>
            {startDate ? startDate.toDateString() : 'Start date'}
          </Text>
          <Text style={{ position: 'absolute', right: 10, top: '50%' }}><Image className=' mx-3' source={require('../../assets/images/down-arrow.png')} /></Text>
        </TouchableOpacity>

        {/* End Date */}
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          className="flex-1 border border-gray-300 rounded-lg p-3 bg-white ml-2"
        >
          <Text className={endDate ? 'text-black' : 'text-gray-400'}>
            {endDate ? endDate.toDateString() : 'End date'}
          </Text>
          <Text style={{ position: 'absolute', right: 10, top: '50%' }}><Image className=' mx-3' source={require('../../assets/images/down-arrow.png')} /></Text>
        </TouchableOpacity>
      </View>

      {/* Show Date Picker for Start Date */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange(e, date, 'start')}
        />
      )}

      {/* Show Date Picker for End Date */}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange(e, date, 'end')}
        />
      )}

      {/* Next Button */}
      <View className="flex-1 items-center">
        <PrimaryButton text="Next" onPress={handleSubmit(onSubmit)} />
        <SecondaryButton text="Skip" onPress={() => navigation.navigate('HealthStatus')} />
      </View>
    </ScrollView>
  );
};

export default OperationHistoryScreen;
