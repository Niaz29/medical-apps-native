import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    onPress : () => void;
    onLongPress ?: () => void;
    title : string;
    disabled : boolean;
    activeOpacity : number;
    style ?: object;
    loading ?: boolean;
    textStyle ?: object;
    iconLeft ?: React.ReactElement;
    iconRight ?: React.ReactElement;
}

const Button : React.FC<Props> = ({
    onPress,
    onLongPress,
    title,
    iconLeft,
    iconRight,
    style,
    textStyle,
    disabled,
    activeOpacity,
    loading,
  }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[disabled ? styles.disabledButton : styles.button, style]}
    >
      {iconLeft}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
      {iconRight}
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    button: {
      backgroundColor: "#42a5f5",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      // Add any additional styles or override default styles here
    },
    disabledButton: {
      backgroundColor: "grey",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      // fontFamily : '',
      // Add any additional styles or override default styles here
    },
  });

export default Button
