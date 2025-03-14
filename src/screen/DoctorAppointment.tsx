import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
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
import { useCreateAppointmentMutation, useUpdateApprovalStatusMutation } from '../features/education/eductionApi';
import { tostify } from '../utils/toast';
import { Loading } from '../components/moleclues/Loading';
import { RecordCard } from './ReportScreen';


const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}


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
        <Text className="text-lg font-bold flex-1 text-center">My Appointments</Text>
      </View>
    </View>
  );
};



// Main App Component
const DoctorAppointment = () => {
  const { currentUser }: any = useSelector((state: RootState) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [updateApprovalStatus] = useUpdateApprovalStatusMutation();

  const fetchAppointments = async () => {
    try {
      const user = await getDataJSON("MEDICAL_AUTH");
      const patientId = user?.currentUser?.patientOrDoctorId;

      if (!patientId) {
        console.error("Patient ID not found!");
        return;
      }

      const response = await fetch(`${BASE_URL}/appointments/doctor/${patientId}`);
      const data = await response.json();

      setAppointments(data); // Set fetched prescriptions
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (id: any) => {
    try {
      const res: any = await updateApprovalStatus(id);

      if (res?.data?.status) {
        tostify({ type: 'success', title: 'Success', subTitle: res?.data?.message });
        fetchAppointments();

      } else if (!res?.data?.status) {
        console.log(res?.data)
        tostify({ type: 'info', title: 'Info', subTitle: res?.data?.message })

      } else {
        tostify({ type: 'error', title: 'Error', subTitle: res?.data?.message || 'Something went wrong!' })
      }
    } catch (err) {
      console.log(err, "err")
      tostify({ type: 'error', title: 'Error', subTitle: 'Something went wrong!' })
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
    setRefreshing(false);
  };

  if (loading) {

    return <Loading />
  }

  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content" />
      <SafeAreaView className="flex-1 bg-[#61CEFF33]">
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } className='pb-4'>
          <Header />

          <View className='flex flex-col gap-y-3 mb-5'>
            {
              appointments?.length > 0 ? appointments?.map((item: any, index: number) => (<View key={item?.id} className='w-[330px] bg-white rounded-lg mx-auto'>


                <View className='border-b-[1px] border-b-[#61CEFF33]'>
                  <Text className='font-semibold text-lg text-[#151B19] px-6 py-3'>Apointment ({index + 1})</Text>
                </View>

                <View className='border-b-[1px] border-b-[#61CEFF33]'>
                  <View className="flex-1 gap-y-1 px-6 py-3">
                    <Text className="text-lg text-[#151B19] font-bold">{item?.patient?.user?.username}</Text>
                    <Text className="text-[#333D3A] font-[400] text-[12px]">{item?.patient?.user?.email}</Text>
                    <Text className="text-[#333D3A] font-[400] text-[12px]">All Records Allow Access for {item?.accessTime} Minutes.</Text>
                    <Text className="text-[#333D3A] font-[400] text-[12px]">Appointment Time {formatDate(item?.createdAt)}</Text>

                    {
                      item?.isApproved ? (<Text className="text-green-500 font-[400] text-[12px]">Status : Approved</Text>) : (<View className='flex-col items-center mt-5 mb-5'><PrimaryButton text="Approved" onPress={() => handleSubmit(item?.id)} /></View>)
                    }

                  </View>
                </View>

                <View className='border-b-[1px] border-b-[#61CEFF33]'>
                  <Text className='font-semibold text-lg text-[#151B19] px-6 py-3'>Reports</Text>
                </View>

                <View className='border-b-[1px] border-b-[#61CEFF33]'>
                  <View className='flex flex-col gap-y-4 px-6 py-3'>
                    {
                      item?.reports?.length > 0 ? item?.reports?.map((item2: any) => {
                        const createdTime = new Date(item?.createdAt);
                        const addCreatedTime = new Date(createdTime?.getTime() + item?.accessTime * 60 * 1000);
                        const currentTime = new Date();
                        let isAccess = true;
                        if (currentTime > addCreatedTime) {
                          isAccess = false;
                        }
                        return <RecordCard key={item2?.id} imgSrc={item2?.docPath} time={item2?.reportDate} doctorName={'you'} userName={item?.patient?.user?.username} title={item2?.title} isAccess={isAccess} />
                      }) : (
                        <Text className='text-center text-base font-semibold'>No Data Available</Text>
                      )
                    }
                  </View>
                </View>

                <View className='border-b-[1px] border-b-[#61CEFF33]'>
                  <Text className='font-semibold text-lg text-[#151B19] px-6 py-3'>Prescriptions</Text>
                </View>

                <View className='border-b-[1px] border-b-[#61CEFF33]'>
                  <View className='flex flex-col gap-y-4 px-6 py-3'>
                    {
                      item?.prescriptions?.length > 0 ? item?.prescriptions?.map((item2: any) => {

                        const createdTime = new Date(item?.createdAt);
                        const addCreatedTime = new Date(createdTime?.getTime() + item?.accessTime * 60 * 1000);
                        const currentTime = new Date();
                        let isAccess = true;
                        if (currentTime > addCreatedTime) {
                          isAccess = false;
                        }
                        return <RecordCard key={item2?.id} imgSrc={item2?.docPath} time={item2?.prescriptionDate} doctorName={'you'} userName={item?.patient?.user?.username} title={item2?.title} isAccess={isAccess} />
                      }) : (
                        <Text className='text-center text-base font-semibold'>No Data Available</Text>
                      )
                    }
                  </View>
                </View>

              </View>)) : (<Text className='text-center text-base font-semibold'>No Data Available</Text>)
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default DoctorAppointment;
