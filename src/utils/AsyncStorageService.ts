import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async ({key, value}: {key: string; value: any}) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const storeDataJSON = async ({key, value}: {key: string; value: any}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

const getData = async (key: string) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      return data;
    } else {
      console.log('data not found');
    }
  } catch (error) {
    console.log(error);
  }
};
const getDataJSON = async (key: string) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      console.log('No data with this key!');
    }
  } catch (error) {
    console.log(error);
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data Removed Successfully');
  } catch (error) {
    console.log(error);
  }
};

export {storeData, storeDataJSON, getData, getDataJSON, removeData};
