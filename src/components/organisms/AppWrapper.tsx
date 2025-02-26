import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const ChatButton = ({ onPress } : any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-16 right-5 bg-green-500 h-16 w-16 rounded-full flex items-center justify-center shadow-lg"
    >
      <Text className="text-white text-3xl">💬</Text>
    </TouchableOpacity>
  );
};

const CloseButton = ({ onPress } : any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-16 right-5 bg-green-500 h-16 w-16 rounded-full flex items-center justify-center shadow-lg"
    >
      <Text className="text-white text-3xl">X</Text>
    </TouchableOpacity>
  );
};

const AppWrapper = ({ children } : any) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const navigation : any = useNavigation();
  const openChatbot = () => {
    navigation.navigate('ChatbotScreen')
    setIsChatbotOpen(true);
  };
  const closeChatbot = () => {
    
    setIsChatbotOpen(false);
  };

  return (
    <View className="flex-1">
      {/* Render the current screen */}
      {children}

      {/* Floating Chatbot Button */}
     {!isChatbotOpen ? <ChatButton onPress={openChatbot} /> : <CloseButton onPress={closeChatbot}/>} 
    </View>
  );
};

export default AppWrapper;
