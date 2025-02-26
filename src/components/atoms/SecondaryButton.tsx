import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SecondaryButton: React.FC<{ text: string, onPress: () => void }> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  text: {
    color: '#666666',
    fontSize: 16,
  },
});

export default SecondaryButton;
