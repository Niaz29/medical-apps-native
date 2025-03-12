import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from "react-native";

export function Loading(){

    return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0EBE7F" />
          <Text>Loading...</Text>
        </SafeAreaView>
      ); // Display loading spinner while waiting
}

const styles = StyleSheet.create({
    
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  