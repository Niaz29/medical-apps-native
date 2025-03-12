import Icon from "@react-native-vector-icons/fontawesome";
import { Text, TouchableOpacity, View } from "react-native";

const CustomCheckbox = ({ label, checked, onToggle }:any) => {
    return (
      <TouchableOpacity
        onPress={onToggle} 
        className="flex-row items-center"
      >
        {/* Checkbox Box */}
        <View className={`w-6 h-6 rounded-md border-2 border-gray-400 justify-center items-center`}>
          {checked && <Icon name="check" size={16} color="green" />}
        </View>
  
        {/* Checkbox Label */}
        <Text className={`ml-2 text-lg text-gray-800`}>{label}</Text>
      </TouchableOpacity>
    );
  };

  export default CustomCheckbox;
  