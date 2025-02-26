import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Provider } from 'react-redux';
import store from './src/app/store';
import TabNavigator from './src/navigators/Tab-navigator';
import StackNavigator from './src/navigators/stack-navigator';
import { Text, View, StatusBar } from 'react-native';
import SplashScreen from './src/screen/SplashScreen';
import "./global.css"
import AppWrapper from './src/components/organisms/AppWrapper';
import Toast from 'react-native-toast-message';




function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  });

  return (
    <>
    
    <StatusBar backgroundColor="#0EBE7F" barStyle="light-content"/>
   
    {
      isShowSplashScreen ? <SplashScreen/> : <NavigationContainer>
        <AppWrapper>
        <StackNavigator/>
        </AppWrapper>

      
    </NavigationContainer>
    }
    <Toast />
    </>
    
   
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

