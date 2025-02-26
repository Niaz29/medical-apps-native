import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface TabButtonProps {
  firstButtonText: string;
  secondButtonText: string;
  selectedTab: string;
  setSelectedTab: (item: string) => void;
}

export default function TabButton({
  firstButtonText = '',
  secondButtonText = '',
  selectedTab = '',
  setSelectedTab,
}: TabButtonProps) {
  const translateX = new Animated.Value(selectedTab === secondButtonText ? 1 : 0);

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: selectedTab === secondButtonText ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedTab]);

  const interpolatedTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // Adjust to match the button width
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.activeTabIndicator,
          {
            transform: [{ translateX: interpolatedTranslateX }],
          },
        ]}
      />
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab(firstButtonText)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === firstButtonText ? styles.activeText : styles.inactiveText,
            ]}
          >
            {firstButtonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab(secondButtonText)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === secondButtonText ? styles.activeText : styles.inactiveText,
            ]}
          >
            {secondButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 48,
    width: 250,
    borderRadius: 12, // Half of height for rounded corners
    borderWidth: 1,
    borderColor: '#67729429',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  tabRow: {
    flexDirection: 'row',
    height: '100%',
    zIndex: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: 'black',
  },
  activeTabIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 48,
    width: 125, // Half the width of the container
    backgroundColor: '#0EBE7F',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#0EBE7F',
    zIndex: 5,
  },
});
