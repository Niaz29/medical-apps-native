

import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderCurve from '../components/atoms/HeaderCurve';
import CircularImage from '../components/atoms/CircularImage';
import { SectionDescription, SectionTitle } from '../components/atoms/SectionText';
import PrimaryButton from '../components/atoms/PrimaryButton';
import SecondaryButton from '../components/atoms/SecondaryButton';


const Wellcome = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HeaderCurve backgroundColor="#0EBE7F" />

      <View style={styles.imageWrapper}>
        <CircularImage source={require('../../assets/images/wellcome.jpeg')} size={200} />
      </View>

      <SectionTitle>Find Trusted Doctors</SectionTitle>
      <View className='mb-12'>
      <SectionDescription>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of it over 2000 years old.
      </SectionDescription>
      </View>

      <PrimaryButton text="Get Started" onPress={() => navigation.navigate('Wellcome2')} />
      <SecondaryButton text="Skip" onPress={() => navigation.navigate('SignupScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    marginTop: 170, 
  },
});

export default Wellcome;

