

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(0.8)).current; 

  useEffect(() => {
    Animated.parallel([
      
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 1500, 
        useNativeDriver: true,
      }),
   
      Animated.timing(scaleAnim, {
        toValue: 1, 
        duration: 1500, 
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/logo.png')} 
        style={[
          styles.logo,
          {
            opacity: fadeAnim, 
            transform: [{ scale: scaleAnim }], 
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0EBE7F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

