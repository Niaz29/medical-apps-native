import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { format, startOfMonth, endOfMonth, addDays, isSameDay, startOfWeek } from 'date-fns';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Generate days for the current month
  const generateCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfMonth(currentMonth);
    const calendarDays = [];
    let day = start;

    while (day <= end || day.getDay() !== 1) {
      calendarDays.push(day);
      day = addDays(day, 1);
    }

    return calendarDays;
  };

  const handleDatePress = (day) => {
    setSelectedDate(day);
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth(
      direction === 'prev'
        ? addDays(startOfMonth(currentMonth), -1)
        : addDays(endOfMonth(currentMonth), 1)
    );
  };

  return (
    <View className="flex bg-white items-center p-3">
      {/* Header */}
      <View className="flex-row rounded-lg items-center justify-between w-full bg-[#0EBE7F] py-4 px-5 mb-6">
      <Text className="text-xl font-bold text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        
        <View className='flex-row justify-between gap-x-8 items-center'>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Text className="text-xl font-bold text-white">{'<'}</Text>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Text className="text-xl font-bold text-white">{'>'}</Text>
        </TouchableOpacity>
        </View>

        
      </View>

      {/* Days of the Week */}
      <View className="flex-row w-full px-5 justify-between mb-2">
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            className="text-gray-600 text-center font-semibold w-10"
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <FlatList
        data={generateCalendarDays()}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleDatePress(item)}
            className={`m-1 w-10 h-10 items-center justify-center rounded-full ${
              isSameDay(item, selectedDate) ? 'bg-green-500' : 'bg-white'
            }`}
          >
            <Text
              className={`text-center ${
                isSameDay(item, selectedDate) ? 'text-white' : 'text-gray-700'
              }`}
            >
              {item.getMonth() === currentMonth.getMonth()
                ? format(item, 'd')
                : ''}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CalendarComponent;
