import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SectionDescription, SectionTitle } from '../components/atoms/SectionText';
import TextInputField from '../components/atoms/TextInputField';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useUpdateUserRoleMutation } from '../features/auth/authApi';
import { getDataJSON } from '../utils/AsyncStorageService';
import { tostify } from '../utils/toast';

const RoleSelection = ({ navigation }: any) => {

  const [updateUserRole] = useUpdateUserRoleMutation()

  const handleRoleSelection = async(role : string) => {

    const storeData = await getDataJSON('MEDICAL_AUTH');

    try{
      const res = await updateUserRole({email : storeData?.currentUser?.email, data: {role}})
   if(res?.data?.status){
    tostify({type : 'success', title : 'Success', subTitle : res?.data?.message});
    role=== 'doctor' ? navigation.navigate('Education') : navigation.navigate('CurentMedication');
   }else if(!res?.data?.status){
    tostify({type : 'info', title : 'Info', subTitle : res?.data?.message || 'Something went wrong!'})
    
   }else{
    tostify({type : 'error', title : 'Error', subTitle : 'Something went wrong!'})
   }
    }catch(err){
      console.log(err, "err")
      tostify({type : 'error', title : 'Error', subTitle : 'Something went wrong!'})
    }

  }


  return (
    <View style={styles.container}>
     
     <View style={{marginBottom: 40}}>
     <SectionTitle>Welcome</SectionTitle>
      <SectionDescription>
        You can search course, apply course and find scholarship for abroad studies.
      </SectionDescription>
     </View>
    
    <View className='w-full flex flex-col justify-center items-center gap-y-5'>
    <PrimaryButton
        text="Doctor"
        onPress={() => handleRoleSelection('doctor')}
      />
      <PrimaryButton
        text="Patient"
        onPress={() => handleRoleSelection('patient')}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F9FCFF',
    alignItems: 'center',
    marginTop : 140
    // justifyContent: 'center',
  },
});

export default RoleSelection;

