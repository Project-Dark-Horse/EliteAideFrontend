// Root App.tsx
import React from 'react';
import App from './src/App';
import LoadingScreen from './src/components/common/LoadingScreen';
import { LoadingProvider } from './src/context/LoadingContext';
import { TaskRefreshProvider } from './src/context/TaskRefreshContext';
import AuthCheck from './src/components/AuthCheck';
import notificationService from './src/utils/notificationService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const RootApp = () => {
  // This will initialize the notification service
  React.useEffect(() => {
    // The service is initialized in its constructor
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // obtained from Google Cloud Console
      iosClientId: 'YOUR_IOS_CLIENT_ID', // obtained from Google Cloud Console
    });
  }, []);

  return (
    <TaskRefreshProvider>
      <LoadingProvider>
        <AuthCheck />
        <App />
      </LoadingProvider>
    </TaskRefreshProvider>
  );
};

export default RootApp;