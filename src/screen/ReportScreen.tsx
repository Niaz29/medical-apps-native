import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import TimeCard from '../components/moleclues/TimeCard';
import { getDataJSON } from '../utils/AsyncStorageService';
import DocumentViewModal from '../components/moleclues/DocumentViewModal';
import { ScrollView } from 'react-native';
import { Loading } from '../components/moleclues/Loading';
import { BASE_URL } from '../constants/apiEndpoints';
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
    <Text className="text-lg font-bold flex-1 text-center">Document</Text>
  </View>
  </View>
  );
};

export const RecordCard = ({doctorName, userName, time, imgSrc, title, isAccess=true}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const formatDate = (dateString : any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };


  return (
    <View>
    <View className='flex-row gap-x-6 border-b-[0.5px] border-[#CACDD4] pb-7'>

      <View className='relative'>
      <View className={`w-[58px] h-[54px] bg-[#0EBE7F] text-white flex-col justify-center items-center rounded-[8px]`}>
            <Text className="text-sm  font-normal">{formatDate(time)}</Text>
        </View>
        <Text className='absolute top-2/4 left-4 w-[33px] h-[18px] pt-1 text-center rounded-lg bg-[#DAFAEE] text-[8px] text-[#333D3A] font-normal'>New</Text>
      </View>

      <View className='flex w-[177px] flex-col gap-y-2'>

        <Text className='text-base text-[#151B19] font-semibold'>Records added by {doctorName}</Text>
        <Text className='text-xs text-[#333D3A] font-normal'>Record for {userName}</Text>
        <Text className='text-xs text-[#333D3A] font-normal'>{title}</Text>
        
      </View>

      <TouchableOpacity onPress={()=> {
        if(isAccess){
          setImageUri(imgSrc);
        setIsVisible(true);
        }else{
          tostify({type : 'error', title : 'Error', subTitle : 'Access Deny!'})
        }
      }}>
      <Image className='w-[20px] h-[20px]' source={require('../../assets/images/Meatballs_menu.png')}/>
      </TouchableOpacity>

    </View>
    <DocumentViewModal isVisible={isVisible} setIsVisible={setIsVisible} imageUri={imageUri}/>
    </View>
  )
}


// Main App Component
const ReportScreen = () => {
    const navigation : any = useNavigation();
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchPrescriptions = async () => {
      try {
        const user = await getDataJSON("MEDICAL_AUTH");
        const patientId = user?.currentUser?.patientOrDoctorId;
  
        if (!patientId) {
          console.error("Patient ID not found!");
          return;
        }
  
        const response = await fetch(`${BASE_URL}/report/patient/${patientId}`);
        const data = await response.json();
        
        setPrescriptions(data); // Set fetched prescriptions
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPrescriptions();
    }, []);

  return (
    <><StatusBar backgroundColor="#61CEFF33" barStyle="light-content"/>
    <SafeAreaView className="flex-1 bg-[#61CEFF33]">
      <Header />
      <ScrollView className='w-[330px] bg-white rounded-lg p-4 mb-4 mx-auto'>
    
    <View className='flex flex-col gap-y-4'>
    {loading ? (
                            <Loading/>
                        ) : (
                            prescriptions?.length > 0 ? prescriptions?.map((item: any) => (
                                <RecordCard key={item?.id} imgSrc={item?.docPath} time={item?.reportDate} doctorName={'you'} userName={item?.patient?.userId?.username} title={item?.title} />
                            )) : (
                                <Text className='text-center text-base font-semibold'>No Data Available</Text>
                            )
                        )}
    </View>
     
     <View className='flex justify-center items-center mt-6'>
     <PrimaryButton
        text="Add a Record"
        onPress={() => navigation.navigate('RecordScreen')}
      />
     </View>
      
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default ReportScreen;
