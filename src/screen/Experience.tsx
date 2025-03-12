import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../components/atoms/PrimaryButton';
import SecondaryButton from '../components/atoms/SecondaryButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import { useCreateExperienceMutation } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';

const experienceSchema = z.object({
  hospitalName: z.string(),
  designation: z.string()
});


const ExperienceScreen = ({ navigation }: any) => {
  const [doseFields, setDoseFields] = useState([{ id: 1, value: '' }]); // Store dose fields
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [degree, setDegree] = useState(null);
  const [instituteName, setInstituteName] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [createExperience] = useCreateExperienceMutation();

  const { control, handleSubmit, reset, formState: { errors}, watch } = useForm({
    resolver: zodResolver(experienceSchema),
  });

  const onSubmit = async(data : any) => {

    try{
      const res : any = await createExperience({hospitalName : data?.hospitalName, designation : data?.designation, startDate, endDate});
  
   if(res?.data?.status){
    tostify({type : 'success', title : 'Success', subTitle : res?.data?.message});
    reset();
    setStartDate(null);
    setEndDate(null);
    navigation.navigate('ProfileScreen')
   }else if(!res?.data?.status){
    tostify({type : 'info', title : 'Info', subTitle : res?.data?.message})
    
   }else{
    tostify({type : 'error', title : 'Error', subTitle : res?.data?.message || 'Something went wrong!'})
   }
    }catch(err){
      console.log(err, "err")
      tostify({type : 'error', title : 'Error', subTitle : 'Something went wrong!'})
    }
  };

  const hospitalOptions = [
    { key: '1', value: 'Square Hospital', location: 'Dhaka', website: 'http://www.squarehospital.com/' },
    { key: '2', value: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)', location: 'Shahbagh, Dhaka', website: 'https://www.bsmmu.edu.bd/' },
    { key: '3', value: 'Evercare Hospital Dhaka', location: 'Bashundhara Residential Area, Dhaka', website: 'https://www.evercarebd.com/' },
    { key: '4', value: 'Dhaka Medical College Hospital', location: 'Dhaka', website: 'http://www.dmc.gov.bd/' },
    { key: '5', value: 'United Hospital Limited', location: 'Gulshan, Dhaka', website: 'https://www.unitedhospital.com.bd/' },
    { key: '6', value: 'BIRDEM General Hospital', location: 'Shahbagh, Dhaka', website: 'http://www.birdem-bd.org/' },
    { key: '7', value: 'Labaid Specialized Hospital', location: 'Dhanmondi, Dhaka', website: 'https://www.labaidgroup.com/' },
    { key: '8', value: 'Holy Family Red Crescent Medical College Hospital', location: 'Eskaton Garden Road, Dhaka', website: 'http://www.hfrcmc.edu.bd/' },
    { key: '9', value: 'Ibrahim Cardiac Hospital & Research Institute', location: 'Shahbagh, Dhaka', website: 'http://www.ibrahimcardiac.org.bd/' },
    { key: '10', value: 'National Institute of Cardiovascular Diseases (NICVD)', location: 'Sher-e-Bangla Nagar, Dhaka', website: 'http://www.nicvd.gov.bd/' }
];

const designationOptions = [
  { key: '1', value: 'General Physician' },
  { key: '2', value: 'Surgeon' },
  { key: '3', value: 'Consultant' },
  { key: '4', value: 'Medical Officer' },
  { key: '5', value: 'Resident Doctor' },
  { key: '6', value: 'Senior Resident' },
  { key: '7', value: 'Chief Medical Officer' },
  { key: '8', value: 'Attending Physician' },
  { key: '9', value: 'Anesthesiologist' },
  { key: '10', value: 'Cardiologist' },
  { key: '11', value: 'Dermatologist' },
  { key: '12', value: 'Endocrinologist' },
  { key: '13', value: 'Gastroenterologist' },
  { key: '14', value: 'Neurologist' },
  { key: '15', value: 'Oncologist' },
  { key: '16', value: 'Orthopedic Surgeon' },
  { key: '17', value: 'Pediatrician' },
  { key: '18', value: 'Psychiatrist' },
  { key: '19', value: 'Radiologist' },
  { key: '20', value: 'Urologist' }
];



  const handleDateChange = (event, selectedDate, type) => {
    if (type === 'start') {
      setStartDate(selectedDate);
      setShowStartDatePicker(false);
    } else if (type === 'end') {
      setEndDate(selectedDate);
      setShowEndDatePicker(false);
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
        <Text className="text-lg font-bold flex-1 text-center">Experience</Text>
      </View>

      <Controller
      control={control}
      name="hospitalName"
      render={({ field: { onChange, value } }) => (
        <View className='my-3'>
          <SelectList 
          setSelected={onChange} 
          data={hospitalOptions} 
          save="value"
          placeholder='Hospital Name'
        
        />
   </View>
      )}
    />
     <View className='w-full mb-2'>
    {errors.hospitalName && <Text className='text-red-500'>{errors.hospitalName.message as string}</Text>}
    </View>


    <Controller
      control={control}
      name="designation"
      render={({ field: { onChange, value } }) => (
        <View className='mb-3'>
        <SelectList 
             setSelected={onChange} 
             data={designationOptions} 
             save="value"
             placeholder='Designation Name'
             
         />
        </View>
      )}
    />
     <View className='w-full mb-2'>
    {errors.designation && <Text className='text-red-500'>{errors.designation.message as string}</Text>}
    </View>

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

      {/* Next Button */}
      <View className="flex-1 items-center">
        <PrimaryButton text="Next" onPress={handleSubmit(onSubmit)} />
        <SecondaryButton text="Add More" onPress={() => navigation.push("Experience")} />
      </View>
    </ScrollView>
  );
};

export default ExperienceScreen;
