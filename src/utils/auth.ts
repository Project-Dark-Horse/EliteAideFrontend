import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token || '';
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return '';
  }
}; 