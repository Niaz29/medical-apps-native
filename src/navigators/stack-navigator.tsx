import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from '../screen/SignIn';
import Wellcome from '../screen/Wellcome';
import Wellcome2 from '../screen/Wellcome2';
import Wellcome3 from '../screen/Wellcome3';
import RoleSelection from '../screen/RoleSelection';
import CurrentMedicationScreen from '../screen/CurrentMedication';
import OperationHistoryScreen from '../screen/OperationHistory';
import HealthStatusScreen from '../screen/HealthStatus';
import EducationScreen from '../screen/Education';
import ExperienceScreen from '../screen/Experience';
import DoctorScreen from '../screen/DoctorScreen';
import DoctorBookScreen from '../screen/DoctorBookScreen';
import DoctorDetails from '../screen/DoctorDetails';
import AppointmentFirstScreen from '../screen/AppointmentFirstScreen';
import AppointmentSecondScreen from '../screen/AppointmentSecondScreen';
import RecordSelectScreen from '../screen/RecordSelectScreen';
import PrescriptionScreen from '../screen/PrescriptionScreen';
import ReportScreen from '../screen/ReportScreen';
import PaymentHistoryScreen from '../screen/PaymentHistoryScreen';
import MapScreen from '../screen/MapScreen';
import ChatScreen from '../screen/ChatScreen';
import ActiveDoctorListScreen from '../screen/ActiveDoctorListScreen';
import ChatbotScreen from '../screen/ChatbotScreen';
import SignupScreen from '../screen/SignupScreen';
import ProfileScreen from '../screen/ProfileScreen';
import TabNavigator from './Tab-navigator';
import TestScreen from '../screen/TestScreen';
import AttachPrescriptionScreen from '../screen/AttachPrescription';
import RecordScreen from '../screen/RecordScreen';
import PatientReport from '../screen/PatientReport';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import DoctorAppointment from '../screen/DoctorAppointment';


export type RootStackParamList = {
  Wellcome: undefined;
  Wellcome2: undefined;
  Wellcome3: undefined;
  SignIn: undefined;
  RoleSelection: undefined;
  CurentMedication : undefined;
  OperationHistory: undefined;
  HealthStatus : undefined;
  Education : undefined;
  Experience : undefined;
  Doctor : undefined;
  DoctorBook: undefined;
  DoctorDetails : undefined;
  AppointmentFisrtScreen : undefined;
  AppointmentSecondScreen : undefined;
  RecordSelectScreen : undefined;
  PrescriptionScreen : undefined;
  ReportScreen : undefined;
  PaymentHistoryScreen: undefined;
  MapScreen : undefined;
  ChatScreen : undefined;
  ActiveDoctorListScreen: undefined;
  ChatbotScreen : undefined;
  SignupScreen: undefined;
  ProfileScreen : undefined;
  VideoCall: undefined;
  TestScreen : undefined;
  AttachPrescriptionScreen: undefined;
  RecordScreen : undefined;
  PatientReport: undefined;
  DoctorAppointment: undefined
};

const Stack =createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  const { currentUser} : any = useSelector((state : RootState) => state.auth);
  
  return (
    <Stack.Navigator initialRouteName={currentUser?.role ? "ProfileScreen" : "Wellcome"}>
      {
        !currentUser?.role ? <>
              <Stack.Screen  options={{ headerShown: false }} name="Wellcome"  component={Wellcome} />
              <Stack.Screen  options={{ headerShown: false }} name="Wellcome2"  component={Wellcome2} />
              <Stack.Screen  options={{ headerShown: false }} name="Wellcome3"  component={Wellcome3} />
              <Stack.Screen  options={{ headerShown: false }} name="SignIn" component={SignIn} />
              <Stack.Screen  options={{ headerShown: false }} name="SignupScreen" component={SignupScreen} />
        </> : <>

        <Stack.Screen  options={{ headerShown: false }} name="ProfileScreen" component={TabNavigator} />
      <Stack.Screen  options={{ headerShown: false }} name="CurentMedication" component={CurrentMedicationScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="OperationHistory" component={OperationHistoryScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="HealthStatus" component={HealthStatusScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="Education" component={EducationScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="Experience" component={ExperienceScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="Doctor" component={DoctorScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="DoctorBook" component={DoctorBookScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="DoctorDetails" component={DoctorDetails} />
      <Stack.Screen  options={{ headerShown: false }} name="AppointmentFisrtScreen" component={AppointmentFirstScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="AppointmentSecondScreen" component={AppointmentSecondScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="RecordSelectScreen" component={RecordSelectScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="PrescriptionScreen" component={PrescriptionScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="RecordScreen" component={RecordScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="ReportScreen" component={ReportScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="PaymentHistoryScreen" component={PaymentHistoryScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="MapScreen" component={MapScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="ChatScreen" component={ChatScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="ActiveDoctorListScreen" component={ActiveDoctorListScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="ChatbotScreen" component={ChatbotScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="AttachPrescriptionScreen" component={AttachPrescriptionScreen} />
      <Stack.Screen  options={{ headerShown: false }} name="PatientReport" component={PatientReport} />
      <Stack.Screen  options={{ headerShown: false }} name="DoctorAppointment" component={DoctorAppointment} />
        </>
      }
      
    
    </Stack.Navigator>
  );
};

export default StackNavigator;
