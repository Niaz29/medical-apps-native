import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SectionDescription, SectionTitle } from '../components/atoms/SectionText';
import TextInputField from '../components/atoms/TextInputField';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tostify } from '../utils/toast';
import { useSigninMutation } from '../features/auth/authApi';


const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters")
});

const SignIn = ({ navigation }: any) => {

  const { control, handleSubmit, reset, formState: { errors}, watch } = useForm({
    resolver: zodResolver(signinSchema),
  });
 
  const [signin] = useSigninMutation();


const onSubmit = async(data : any) => {

  try{
    const res : any = await signin(data);
 if(res?.data?.status){
  tostify({type : 'success', title : 'Success', subTitle : res?.data?.message});
  reset();
  // navigation.navigate('RoleSelection');
  navigation.navigate('ProfileScreen')
 }else if(!res?.data?.status){
  tostify({type : 'info', title : 'Info', subTitle : res?.data?.message || 'Something went wrong!'})
  
 }else{
  tostify({type : 'error', title : 'Error', subTitle : 'Something went wrong!'})
 }
  }catch(err){
    console.log(err, "err")
    tostify({type : 'error', title : 'Error', subTitle : 'Something went wrong!'})
  }
};

  return (
    <View >
     
     <View style={{marginBottom: 40}}>
     <SectionTitle>Welcome</SectionTitle>
      <SectionDescription>
        You can search course, apply course and find scholarship for abroad studies.
      </SectionDescription>
     </View>

    <View className='mb-7 w-full flex justify-center items-center'>
    <Controller
      control={control}
      name="email"
      render={({ field: { onChange, value } }) => (
        <TextInputField
        placeholder="Email"
        isError={!!errors.email}
        value={value}
        onChangeText={onChange}
      />
      )}
    />
    <View className='w-full ml-24'>
    {errors.email && <Text className='text-red-500'>{errors.email.message as string}</Text>}
    </View>
    
    <Controller
      control={control}
      name="password"
      render={({ field: { onChange, value } }) => (
        <TextInputField
        placeholder="Password"
        value={value}
        isError={!!errors.password}
        onChangeText={onChange}
        secureTextEntry
      />
      )}
    />
    <View className='w-full ml-24'>
    {errors.password && <Text className='text-red-500'>{errors.password.message as string}</Text>}
    </View>

</View>

    <View className='flex w-full justify-center items-center'>
     <PrimaryButton
        text="Log In"
        onPress={handleSubmit(onSubmit)}
      />
     </View>

     <Text className="mt-4 mx-auto w-[70%]">
    <Text>Do n't have an account? </Text>
    <Text onPress={() => navigation.navigate('SignupScreen')} className='mr-2 text-[#0EBE7F]'>SignUp </Text>
   <Text >Here</Text>
  </Text>
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

export default SignIn;

