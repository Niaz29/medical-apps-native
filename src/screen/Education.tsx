import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../components/atoms/PrimaryButton';
import SecondaryButton from '../components/atoms/SecondaryButton';
import { SelectList } from 'react-native-dropdown-select-list'
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateEducationMutation } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';


const educationSchema = z.object({
  degreeName: z.string(),
  instituteName: z.string()
});

const EducationScreen = ({ navigation }: any) => {                 
  const [doseFields, setDoseFields] = useState([{ id: 1, value: '' }]); // Store dose fields
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [degree, setDegree] = useState(null);
  const [instituteName, setInstituteName] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selected, setSelected] = useState("");

  const [createEducation] = useCreateEducationMutation();

  const degreeOptions = [
    { key: '1', value: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)' },
    { key: '2', value: 'MD (Doctor of Medicine)' },
    { key: '3', value: 'DO (Doctor of Osteopathic Medicine)' },
    { key: '4', value: 'BDS (Bachelor of Dental Surgery)' },
    { key: '5', value: 'DDS (Doctor of Dental Surgery)' },
    { key: '6', value: 'DPT (Doctor of Physical Therapy)' },
    { key: '7', value: 'PharmD (Doctor of Pharmacy)' },
    { key: '8', value: 'DVM (Doctor of Veterinary Medicine)' },
    { key: '9', value: 'DM (Doctorate of Medicine - Super Specialization)' },
    { key: '10', value: 'MCh (Master of Chirurgiae - Surgical Super Specialization)' },
    { key: '11', value: 'DHMS (Diploma in Homeopathic Medicine and Surgery)' },
    { key: '12', value: 'BUMS (Bachelor of Unani Medicine and Surgery)' },
    { key: '13', value: 'BHMS (Bachelor of Homeopathic Medicine and Surgery)' },
    { key: '14', value: 'BNYS (Bachelor of Naturopathy and Yogic Sciences)' },
    { key: '15', value: 'DS (Doctor of Surgery)' }
];

const instituteOptions = [
  { key: '1', value: 'Harvard Medical School' },
  { key: '2', value: 'Johns Hopkins University' },
  { key: '3', value: 'Mayo Clinic Alix School of Medicine' },
  { key: '4', value: 'Stanford University' },
  { key: '5', value: 'AIIMS (All India Institute of Medical Sciences)' },
  { key: '6', value: 'Michigan State University College of Osteopathic Medicine' },
  { key: '7', value: 'Philadelphia College of Osteopathic Medicine' },
  { key: '8', value: 'King’s College London' },
  { key: '9', value: 'University of Hong Kong' },
  { key: '10', value: 'University of California San Francisco' },
  { key: '11', value: 'University of Southern California' },
  { key: '12', value: 'University of Delaware' },
  { key: '13', value: 'University of North Carolina at Chapel Hill' },
  { key: '14', value: 'Cornell University' },
  { key: '15', value: 'Royal Veterinary College (UK)' },
  { key: '16', value: 'PGIMER (Postgraduate Institute of Medical Education and Research, India)' },
  { key: '17', value: 'JIPMER (Jawaharlal Institute of Postgraduate Medical Education & Research, India)' },
  { key: '18', value: 'National Institute of Homeopathy (India)' },
  { key: '19', value: 'British Institute of Homeopathy' },
  { key: '20', value: 'Aligarh Muslim University (India)' },
  { key: '21', value: 'Jamia Hamdard (India)' },
  { key: '22', value: 'Maharashtra University of Health Sciences (India)' },
  { key: '23', value: 'S-VYASA (Swami Vivekananda Yoga Anusandhana Samsthana, India)' },
  { key: '24', value: 'SDM College of Naturopathy & Yogic Sciences (India)' }
];


const { control, handleSubmit, reset, formState: { errors}, watch } = useForm({
  resolver: zodResolver(educationSchema),
});

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


  const onSubmit = async(data : any) => {

    try{
      const res : any = await createEducation({degreeName : data?.degreeName, instituteName : data?.instituteName, startDate, endDate});
  
   if(res?.data?.status){
    tostify({type : 'success', title : 'Success', subTitle : res?.data?.message});
    reset();
    setStartDate(null);
    setEndDate(null);
    navigation.navigate('Experience')
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

  return (
    <ScrollView className="flex-1 bg-blue-50 px-4">
      {/* Header with Back Icon */}
      <View className="flex-row items-center mt-3 mb-24">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Replace this text with an icon if needed */}
          <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center">Education</Text>
      </View>

      <Controller
      control={control}
      name="degreeName"
      render={({ field: { onChange, value } }) => (
        <View className='my-3'>
          <SelectList 
          setSelected={onChange} 
          data={degreeOptions} 
          save="value"
          placeholder='Degree Name'
        
        />
   </View>
      )}
    />
     <View className='w-full mb-2'>
    {errors.degreeName && <Text className='text-red-500'>{errors.degreeName.message as string}</Text>}
    </View>


    <Controller
      control={control}
      name="instituteName"
      render={({ field: { onChange, value } }) => (
        <View className='mb-3'>
        <SelectList 
             setSelected={onChange} 
             data={instituteOptions} 
             save="value"
             placeholder='Inistitue Name'
             
         />
        </View>
      )}
    />
     <View className='w-full mb-2'>
    {errors.instituteName && <Text className='text-red-500'>{errors.instituteName.message as string}</Text>}
    </View>
   

  


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

      {/* Next Button */}
      <View className="flex-1 items-center">
        <PrimaryButton text="Next" onPress={handleSubmit(onSubmit)}/>
        <SecondaryButton text="Add More" onPress={() => navigation.push("Education")} />
      </View>
    </ScrollView>
  );
};

export default EducationScreen;
