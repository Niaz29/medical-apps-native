import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';

// Header Component
const Header = () => {
    const navigation = useNavigation();
  return (
    <View className=' px-3 py-7'>
    <View className="flex-row items-center mt-3">
    <TouchableOpacity onPress={() => navigation.goBack()}>
      {/* Replace this text with an icon if needed */}
      <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
    </TouchableOpacity>
    <Text className="text-lg font-bold flex-1 text-center">Chatbot</Text>
  </View>
  </View>
  );
};

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome! How can I assist you today?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText, sender: 'user' },
        { id: (Date.now() + 1).toString(), text: 'Let me check that for you.', sender: 'bot' },
      ]);
      setInputText('');
    }
  };

  const renderMessage = ({ item } : any) => {
    const isUser = item.sender === 'user';
    return (
      <View
        className={`my-2 mx-4 p-3 rounded-lg max-w-[80%] ${
          isUser ? 'bg-green-500 self-end' : 'bg-gray-200 self-start'
        }`}>
        <Text className={`${isUser ? 'text-white' : 'text-black'}`}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <Header/>

      {/* Chat Area */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        className="flex-1 px-2 py-4"
      />

      {/* Input Area */}
      <View className="flex-row items-center px-4 py-2 bg-white">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-4 text-black"
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="ml-2 bg-green-500 rounded-full h-10 w-10 flex items-center justify-center">
          <Text className="text-white text-lg">📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatbotScreen;