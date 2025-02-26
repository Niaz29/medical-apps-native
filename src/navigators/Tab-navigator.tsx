
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screen/NotificationScreen';
import ProfileScreen from '../screen/ProfileScreen';
import TaskScreen from '../screen/TaskScreen';
import TestScreen from '../screen/TestScreen';
import DoctorScreen from '../screen/DoctorScreen';
import PaymentHistoryScreen from '../screen/PaymentHistoryScreen';
import MapScreen from '../screen/MapScreen';

const Tab = createBottomTabNavigator();


const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
    initialRouteName="Profile"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
    }}
  >
    
      <Tab.Screen
      name="Doctor"
      component={DoctorScreen}
      options={{ headerShown: false }} 
    />
   
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }} 
    />
     <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{ headerShown: false }} 
    />
     
  </Tab.Navigator>
  );
};

export default TabNavigator;