// Root App.tsx
import React from 'react';
import App from './src/App';
import LoadingScreen from './src/components/common/LoadingScreen';
import { LoadingProvider } from './src/context/LoadingContext';
import { TaskRefreshProvider } from './src/context/TaskRefreshContext';
import AuthCheck from './src/components/AuthCheck';
import notificationService from './src/utils/notificationService';

const RootApp = () => {
  // This will initialize the notification service
  React.useEffect(() => {
    // The service is initialized in its constructor
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