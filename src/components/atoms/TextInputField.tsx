import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface TextInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  isError? : boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  isError = false
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={[
          styles.textInputWrapper,
          { borderColor: isError ? 'red' : '#E0E0E0' },
        ]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          placeholderTextColor="#999"
          keyboardType="default"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {isSecure ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color : 'green',
  },
  toggleButton: {
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  toggleButtonText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TextInputField;
