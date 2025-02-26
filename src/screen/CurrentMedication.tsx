import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../components/atoms/PrimaryButton';
import SecondaryButton from '../components/atoms/SecondaryButton';
import { useCreateCurrentMedicationMutation, useGetAllDoctorQuery } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';
import { SelectList } from 'react-native-dropdown-select-list';

// Zod validation schema
const medicationSchema = z.object({
  doses: z.array(z.string().min(1, 'Dose cannot be empty')),
  doctorId: z.string()
});

const CurrentMedicationScreen = ({ navigation }) => {
  const [doseFields, setDoseFields] = useState([{ id: 1, value: '' }]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [createCurrentMedication] = useCreateCurrentMedicationMutation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {data: doctors} = useGetAllDoctorQuery(null);

  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(medicationSchema)
  });

 const doctorOptions = doctors?.map((doc : any, index : number) => ({ key: index++, value: doc?.user?.username}))

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

  const handleAddAnotherDose = () => {
    setDoseFields([...doseFields, { id: doseFields.length + 1, value: '' }]);
  };

  const onSubmit = async (data : any) => {
    const doctorId = doctors?.find((item: any) => item?.user?.username === data?.doctorId)?.id;
    try {
      const res = await createCurrentMedication({doses : data?.doses, startDate, endDate, doctorId} );
      if (res?.data?.status) {
        tostify({ type: 'success', title: 'Success', subTitle: res?.data?.message });
        reset();
        setEndDate(null);
        setStartDate(null);
        navigation.navigate('OperationHistory');
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
      <View className="flex-row items-center mt-3 mb-24">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center">Current Medication</Text>
      </View>

      <Controller
      control={control}
      name="doctorId"
      render={({ field: { onChange, value } }) => (
        <View className='my-3'>
          <SelectList 
          setSelected={onChange} 
          data={doctorOptions} 
          save="value"
          placeholder='Select Doctor'
        
        />
   </View>
      )}
    />
      <View className='w-full mb-2'>
    {errors.doctorId && <Text className='text-red-500'>{errors.doctorId.message as string}</Text>}
    </View>

      <View>
        {doseFields.map((doseField, index) => (
          <Controller
            key={doseField.id}
            control={control}
            name={`doses.${index}`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white mb-4"
                placeholder={`Dose ${index + 1}`}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        ))}
        {errors.doses && <Text className="text-red-500">{errors.doses[0].message}</Text>}
      </View>

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
            {startDate ? startDate?.toDateString() : 'Start date'}
          </Text>
          <Text style={{ position: 'absolute', right: 10, top: '50%' }}> <Image className=' mx-3' source={require('../../assets/images/down-arrow.png')} /></Text>
        </TouchableOpacity>

        {/* End Date */}
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          className="flex-1 border border-gray-300 rounded-lg p-3 bg-white ml-2"
        >
          <Text className={endDate ? 'text-black' : 'text-gray-400'}>
            {endDate ? endDate.toDateString() : 'End date'}
          </Text>
          <Text style={{ position: 'absolute', right: 10, top: '50%' }}> <Image className=' mx-3' source={require('../../assets/images/down-arrow.png')} /></Text>
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
      <View className="flex-1 items-center">
        <PrimaryButton text="Next" onPress={handleSubmit(onSubmit)} />
        <SecondaryButton text="Skip" onPress={() => navigation.navigate('OperationHistory')} />
      </View>
    </ScrollView>
  );
};

export default CurrentMedicationScreen;
