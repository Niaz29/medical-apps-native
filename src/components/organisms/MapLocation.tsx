import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

export const fetchNearbyHospitals = async (latitude : any, longitude : any, type: string) => {
  const apiKey = 'AIzaSyD7UzE8BosYKDMUeL16AlrJIJWVEOr73pQ';
  const radius = 2000; // Radius in meters (2 km)

  let url = '';
  if(type === 'Hospital'){
     url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&key=${apiKey}`;
  } else {
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=doctor&key=${apiKey}`;
  }

  try {
    const response = await axios.get(url);
    const hospitals = response.data.results.slice(0, 10); // Limit to 5 results
    return hospitals;
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    return [];
  }
};

const HospitalMap = ({ type = 'Hospital' }: { type: string }) => {
  const [region, setRegion] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    getCurrentLocation((latitude: any, longitude: any) => {
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      fetchNearbyHospitals(latitude, longitude, type).then((hospitalsData) => {
        setHospitals(hospitalsData);
        setLoading(false); // Set loading to false after data is fetched
      });
    });
  }, [type]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0EBE7F" />
        <Text>Loading...</Text>
      </SafeAreaView>
    ); // Display loading spinner while waiting
  }

  if (!region) {
    return null; // Show nothing if region is not set
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView style={styles.mapStyle} initialRegion={region} customMapStyle={mapStyle}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Your Location" />
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: hospital.geometry.location.lat,
                longitude: hospital.geometry.location.lng,
              }}
              title={hospital.name}
              description={hospital.vicinity}
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HospitalMap;
