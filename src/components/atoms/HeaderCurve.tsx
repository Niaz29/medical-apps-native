import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HeaderCurve: React.FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
  return (
    <View style={[styles.curve, { backgroundColor }]} />
  );
};

const styles = StyleSheet.create({
  curve: {
    width: '100%',
    height: '40%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'absolute',
  },
});

export default HeaderCurve;
