import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SectionDescription, SectionTitle } from '../components/atoms/SectionText';
import TextInputField from '../components/atoms/TextInputField';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useSignupMutation, useSendOtpMutation , useVerifyOtpMutation} from '../features/auth/authApi';

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tostify } from '../utils/toast';
import { SelectList } from 'react-native-dropdown-select-list';


const signupSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  role: z.string(),
  email: z.string().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

const SignupScreen = ({ navigation }: any) => {

  const roleOptions = [
    {key : 1, value : 'patient'},
    {key : 2, value : 'doctor'}
  ]


  const { control, handleSubmit, reset, formState: { errors}, watch } = useForm({
    resolver: zodResolver(signupSchema),
  });

const [signup] = useSignupMutation();
const [sendOtp] = useSendOtpMutation();
const [verifyOtp] = useVerifyOtpMutation();

const onSubmit = async(data : any) => {
  try{
    const res : any = await signup(data);

 if(res?.data?.status){
  tostify({type : 'success', title : 'Success', subTitle : res?.data?.message});
  reset();
  // navigation.navigate('RoleSelection');
  data?.role === 'doctor' ? navigation.navigate('Education') : navigation.navigate('CurentMedication')
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

const handleSendOtp = async() => {
  
  if(watch('email')){
    try{
      const res : any = await sendOtp({email : watch('email')});
   if(res?.data?.status){
    tostify({type : 'success', title : 'Success', subTitle : res?.data?.message})
   }else if(!res?.data?.status){
    console.log("res.dara", res.data);
    tostify({type : 'info', title : 'Info', subTitle : res?.data?.message})
   }else{
    tostify({type : 'error', title : 'Error', subTitle : res?.data?.message || 'Something went wrong!'})
   }
    }catch(err){
      console.log(err, "err")
      tostify({type : 'error', title : 'Error', subTitle : 'Something went wrong!'})
    }
  }

}

const handleVerifyOtp = async() => {
  
  if(watch('code')){
    try{
      const res : any = await verifyOtp({otp : watch('code')});
   if(res?.data?.status){
    tostify({type : 'success', title : 'Success', subTitle : res?.data?.message})
   }else if(!res?.data?.status){
    tostify({type : 'info', title : 'Info', subTitle : res?.data?.message})
   }else{
    tostify({type : 'error', title : 'Error', subTitle : res?.data?.message || 'Something went wrong!'})
   }
    }catch(err){
      console.log(err, "err")
      tostify({type : 'error', title : 'Error', subTitle : 'Something went wrong!'})
    }
  }

}




  return (
    <ScrollView>
    
     <View style={{marginBottom: 10}}>
     <SectionTitle>Welcome</SectionTitle>
      <SectionDescription>
        You can search course, apply course and find scholarship for abroad studies.
      </SectionDescription>
     </View>

    <View className='mb-2 w-full flex justify-center items-center'>
    <Controller
      control={control}
      name="username"
      render={({ field: { onChange, value } }) => (
        <TextInputField placeholder="Username" value={value} onChangeText={onChange} isError={!!errors.username}/>
      )}
    />
    <View className='w-full ml-24'>
    {errors.username && <Text className='text-red-500'>{errors.username.message as string}</Text>}
    </View>

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

      <TouchableOpacity onPress={handleSendOtp} className='flex justify-between flex-row items-center'>
        <Text className='w-[75%]'></Text>
        <Text className='text-[#0EBE7F] w-[25%] text-sm'>Send OTP</Text>
      </TouchableOpacity>

      <Controller
      control={control}
      name="code"
      render={({ field: { onChange, value } }) => (
        <TextInputField
        placeholder="Verification Code"
        value={value}
        onChangeText={onChange}
      />
      )}
    />
      
       <TouchableOpacity onPress={handleVerifyOtp} className='flex justify-between flex-row items-center'>
        <Text className='w-[90%]'></Text>
        <Text className='text-[#0EBE7F] w-[25%] text-sm'>Verify</Text>
      </TouchableOpacity>

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
      
    <Controller
      control={control}
      name="confirmPassword"
      render={({ field: { onChange, value } }) => (
        <TextInputField
        placeholder="Confirm Password"
        value={value}
        isError={!!errors.confirmPassword}
        onChangeText={onChange}
        secureTextEntry
      />
      )}
    />
    <View className='w-full ml-24'>
    {errors.confirmPassword && <Text className='text-red-500'>{errors.confirmPassword.message as string}</Text>}
    </View>


    <Controller
      control={control}
      name="role"
      render={({ field: { onChange, value } }) => (
        <View className='w-[80%]'>
          <SelectList 
          setSelected={onChange} 
          data={roleOptions}
          save="value"
          placeholder='Select Role'
        
        />
   </View>
      )}
    />
      <View className='w-full ml-24'>
    {errors.role && <Text className='text-red-500'>{errors.role.message as string}</Text>}
    </View>

</View>

<View className='flex w-full justify-center items-center'>
    <PrimaryButton
      
      text="Sign Up"
      onPress={handleSubmit(onSubmit)}
    />
</View>

  <Text className="mt-4 mx-auto w-[70%]">
    <Text>Already have an account? </Text>
    <Text onPress={() => navigation.navigate('SignIn')} className='mr-2 text-[#0EBE7F]'>SignIn </Text>
   <Text >Here</Text>
  </Text>

  </ScrollView>
  );
};




export default SignupScreen;


// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SectionDescription, SectionTitle } from '../components/atoms/SectionText';
// import TextInputField from '../components/atoms/TextInputField';
// import PrimaryButton from '../components/atoms/PrimaryButton';
// import { useSignupMutation } from '../features/auth/authApi';

// const signupSchema = z.object({
//   username: z.string().trim().min(3, "Username must be at least 3 characters"),
//   email: z.string().email("Invalid email format"),
//   password: z.string().trim().min(6, "Password must be at least 6 characters"),
//   confirmPassword: z.string()
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"],
// });

// const SignupScreen = ({ navigation } : any) => {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(signupSchema),
//   });
  
//   const [signup] = useSignupMutation();

//   const onSubmit = (data : any) => {
//     console.log(data);
//     // navigation.navigate('RoleSelection');
//   };

//   return (
//     <View className='p-4'>
//       <View style={{ marginBottom: 20 }}>
//         <SectionTitle>Welcome</SectionTitle>
//         <SectionDescription>
//           You can search for courses, apply for courses, and find scholarships for studying abroad.
//         </SectionDescription>
//       </View>
      
//       <View className='mb-7 w-full flex justify-center items-center'>
//         <Controller
//           control={control}
//           name="username"
//           render={({ field: { onChange, value } }) => (
//             <TextInputField placeholder="Username" value={value} onChangeText={onChange} />
//           )}
//         />
//         {errors.username && <Text className='text-red-500'>{errors.username.message}</Text>}

//         <Controller
//           control={control}
//           name="email"
//           render={({ field: { onChange, value } }) => (
//             <TextInputField placeholder="Email" value={value} onChangeText={onChange} />
//           )}
//         />
//         {errors.email && <Text className='text-red-500'>{errors.email.message}</Text>}

//         <TouchableOpacity className='flex justify-between flex-row items-center'>
//           <Text className='w-[75%]'></Text>
//           <Text className='text-[#0EBE7F] w-[25%] text-sm py-2'>Send OTP</Text>
//         </TouchableOpacity>
        
//         <Controller
//           control={control}
//           name="code"
//           render={({ field: { onChange, value } }) => (
//             <TextInputField placeholder="Verification Code" value={value} onChangeText={onChange} />
//           )}
//         />
//         {errors.code && <Text className='text-red-500'>{errors.code.message}</Text>}
        
//         <TouchableOpacity className='flex justify-between flex-row items-center'>
//           <Text className='w-[90%]'></Text>
//           <Text className='text-[#0EBE7F] w-[25%] text-sm py-2'>Verify</Text>
//         </TouchableOpacity>
        
//         <Controller
//           control={control}
//           name="password"
//           render={({ field: { onChange, value } }) => (
//             <TextInputField placeholder="Password" value={value} onChangeText={onChange} secureTextEntry />
//           )}
//         />
//         {errors.password && <Text className='text-red-500'>{errors.password.message}</Text>}
        
//         <Controller
//           control={control}
//           name="confirmPassword"
//           render={({ field: { onChange, value } }) => (
//             <TextInputField placeholder="Confirm Password" value={value} onChangeText={onChange} secureTextEntry />
//           )}
//         />
//         {errors.confirmPassword && <Text className='text-red-500'>{errors.confirmPassword.message}</Text>}
//       </View>

//       <View className='flex w-full justify-center items-center'>
//         <PrimaryButton text="Sign Up" onPress={handleSubmit(onSubmit)} />
//       </View>

//       <Text className="mt-4 mx-auto w-[70%]">
//         <Text>Already have an account? </Text>
//         <Text onPress={() => navigation.navigate('SignIn')} className='mr-2 text-[#0EBE7F]'>Sign In</Text>
//         <Text> Here</Text>
//       </Text>
//     </View>
//   );
// };

// export default SignupScreen;


