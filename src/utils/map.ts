import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export const getCurrentLocation = (callback : any) => {
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      callback(latitude, longitude);
    },
    (error) => {
      console.error(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};



export const fetchNearbyHospitals = async (latitude : any, longitude : any) => {
  const apiKey = 'AIzaSyDNvQ2RiS5AGCjRZ5_7X1Mdr0E-QTUPgX8';
  const radius = 2000; // Radius in meters (2 km)
  const type = 'hospital';
  
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const hospitals = response.data.results.slice(0, 5); // Limit to 5 results
    return hospitals;
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    return [];
  }
};



