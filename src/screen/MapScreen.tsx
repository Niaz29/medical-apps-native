import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

import TabButton from '../components/moleclues/TabButton';
import Map from '../components/organisms/Map';
import HospitalMap from '../components/organisms/MapLocation';

// Main App Component
const MapScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Doctor');

    console.log("selectedTab", selectedTab)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Map Component */}
            <View style={{ flex: 1 }}>
                {/* <Map /> */}
                <HospitalMap type={selectedTab}/>
                
                {/* TabButton positioned over the Map */}
                <View style={styles.tabButtonContainer}>
                    <TabButton 
                        firstButtonText="Doctor" 
                        secondButtonText="Hospital" 
                        selectedTab={selectedTab} 
                        setSelectedTab={setSelectedTab} 
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabButtonContainer: {
        position: 'absolute', // Overlay on the map
        top: 10, // Adjust this value to position it vertically on the map
        alignSelf: 'center', // Horizontally center it
        zIndex: 10, // Ensure it appears above the map
    },
});

export default MapScreen;
