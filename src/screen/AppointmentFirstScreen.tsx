import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import TextInputField from '../components/atoms/TextInputField';
import SecondaryButton from '../components/atoms/SecondaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import CustomCheckbox from '../components/atoms/CustomChecckbox';
import { getDataJSON } from '../utils/AsyncStorageService';
import { BASE_URL } from '../constants/apiEndpoints';
import TimeCard from '../components/moleclues/TimeCard';
import { useCreateAppointmentMutation } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';


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


// Patient Card Component
const PatientCard = ({ patient } : any) => {
  return (
    <View className="p-6 mx-4">
      <View className="flex-row">
        <View className="flex-1 gap-y-2">
          <Text className="text-lg text-[#151B19] font-bold">{patient.name}</Text>
          <Text className="text-[#333D3A] font-[400] text-[12px]">{patient.email}</Text>
        </View>
      </View>
 
    </View>
  );
};



// Doctor Card Component
const DoctorCard = ({ doctor } : any) => {
  return (
    <View className="p-6 mx-4  gap-y-6">
      <View className="flex-row">
        <Image
          source={{ uri: doctor.image }}
          className="w-[77px] h-[77px] rounded-full"
        />
        <View className="ml-7 flex-1 gap-y-2">
          <Text className="text-lg text-[#151B19] font-bold">{doctor.name}</Text>
          <Text className="text-[#333D3A] font-[400] text-[12px]">{doctor.specialty}</Text>
          <View className="flex-row justify-between items-center">
          <Text className="text-yellow-400 text-center mt-1">★★★★★</Text>
          <Text className="text-[10px] font-[400] text-[#333D3A] text-center">$20 / hr</Text>
          </View>
        </View>
      </View>
 
    </View>
  );
};

// Main App Component
const AppointmentFirstScreen = ({route}:any) => {
  const {currentUser} : any = useSelector((state : RootState) => state.auth);
    const [reportsChecked, setReportsChecked] = useState<any>([]);
    const [prescriptionsChecked, setPrescriptionsChecked] = useState<any>([]);
    const [selectedMinute, setSelectedMinute] = useState(1);
    const navigation : any = useNavigation();

    const [createAppointment] = useCreateAppointmentMutation()

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

    const doctor = {
      ...route?.params,
      experience: '07 Years experience',
      rating: 87,
      patientStories: 69,
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838',

    }
    const patient = {
      name : currentUser?.username,
      email : currentUser?.email
    }

    const fetchReports = async () => {
      try {
        const user = await getDataJSON("MEDICAL_AUTH");
        const patientId = user?.currentUser?.patientOrDoctorId;
  
        if (!patientId) {
          console.error("Patient ID not found!");
          return;
        }
  
        const response = await fetch(`${BASE_URL}/report/patient/${patientId}`);
        const data = await response.json();
        
        const reports = data?.map((item : any) => ({id : item?.id, title : item?.title, isChecked : false}));
        setReportsChecked(reports);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        // setLoading(false);
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const user = await getDataJSON("MEDICAL_AUTH");
        const patientId = user?.currentUser?.patientOrDoctorId;
  
        if (!patientId) {
          console.error("Patient ID not found!");
          return;
        }
  
        const response = await fetch(`${BASE_URL}/prescription/patient/${patientId}`);
        const data = await response.json();
        
        const prescriptions = data?.map((item : any) => ({id : item?.id, title : item?.title, isChecked : false}));
        setPrescriptionsChecked(prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        // setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchReports();
      fetchPrescriptions();
    }, []);

    const handleReportChecked = (item : any) => {
      const updatedReportsChecked = reportsChecked?.map((report : any) => {
        if(item?.isChecked){
          if(report?.id === item?.id){
            return {
              ...report,
              isChecked : false
            }
          }
          return report;
        }else{
          if(report?.id === item?.id){
            return {
              ...report,
              isChecked : true
            }
          }
          return report;
        }
      });
      setReportsChecked(updatedReportsChecked);
    } 

    const handlePrescriptionChecked = (item : any) => {
      const updatedReportsChecked = prescriptionsChecked?.map((report : any) => {
        if(item?.isChecked){
          if(report?.id === item?.id){
            return {
              ...report,
              isChecked : false
            }
          }
          return report;
        }else{
          if(report?.id === item?.id){
            return {
              ...report,
              isChecked : true
            }
          }
          return report;
        }
      });
      setPrescriptionsChecked(updatedReportsChecked);
    }


    const handleSubmit = async() => {

      const selectedReports = reportsChecked?.filter((item : any)=> item?.isChecked);
      const reportIds = selectedReports?.map((item : any) => item?.id);

      const selectedPrescriptions = prescriptionsChecked?.filter((item : any)=> item?.isChecked);
      const prescriptionIds = selectedPrescriptions?.map((item : any) => item?.id);

      const accessTime = minuteOptions?.find((item : any)=> item?.id === selectedMinute)?.title || '30'

      try{
        const res : any = await createAppointment({patientId : currentUser?.patientOrDoctorId, doctorId : route?.params?.id, reports: reportIds, prescriptions: prescriptionIds, accessTime: parseInt(accessTime)});
    
     if(res?.data?.status){
      tostify({type : 'success', title : 'Success', subTitle : res?.data?.message});
      
     }else if(!res?.data?.status){
      console.log(res?.data)
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
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <ScrollView className='pb-4'>
      <Header />
      <Text className='font-semibold text-lg text-[#151B19] my-4 ml-4'>Doctor Info:</Text> 
      <View className='w-[330px] bg-white rounded-lg mx-auto pb-7'>
      <DoctorCard doctor={doctor} />
    </View>

      <Text className='font-semibold text-lg text-[#151B19] my-4 ml-4'>Patient Info:</Text> 
      <View className='w-[330px] bg-white rounded-lg mx-auto'>
      <PatientCard patient={patient} />
    </View>
    <Text className='font-semibold text-lg text-[#151B19] my-4 ml-4'>Select Reports:</Text> 
      <View className='w-[330px] bg-white rounded-lg mx-auto p-6'>
        {
          reportsChecked?.length > 0 ? (reportsChecked?.map((item : any) => (<View key={item?.id}>
            <CustomCheckbox
              label={item?.title}
              checked={item?.isChecked} 
              onToggle={() => handleReportChecked(item)} 
            />
        </View>))) : ( <Text className='text-center text-base font-semibold'>No Data Available</Text>)
          
        }
    
    </View>

    <Text className='font-semibold text-lg text-[#151B19] my-4 ml-4'>Select Prescriptions:</Text> 
      <View className='w-[330px] bg-white rounded-lg mx-auto p-6'>
        {
          prescriptionsChecked?.length > 0 ? (prescriptionsChecked?.map((item : any) => (<View key={item?.id}>
            <CustomCheckbox
              label={item?.title}
              checked={item?.isChecked} 
              onToggle={() => handlePrescriptionChecked(item)}
            />
        </View>))) : ( <Text className='text-center text-base font-semibold'>No Data Available</Text>)
          
        }
    
    </View>


    <Text className='font-semibold text-lg text-[#151B19] my-4 ml-4'>Select time for access records:</Text> 
      <View className='w-[330px] bg-white rounded-lg mx-auto p-6 flex-row gap-3 flex-wrap'>
      
        {
            minuteOptions?.map((item) => (<TouchableOpacity onPress={() => setSelectedMinute(item.id)} key={item.id}><TimeCard isSelected={selectedMinute === item.id} title={item.title} subtitle={item.subtitle}/></TouchableOpacity>))
        }
        
    </View>

    <View className='flex-col items-center mt-5 mb-5'><PrimaryButton text="Confirm"  onPress={handleSubmit} /></View>
    </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default AppointmentFirstScreen;
