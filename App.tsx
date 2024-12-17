// Root App.tsx
import React from 'react';
import App from './src/App';
import LoadingScreen from './src/components/common/LoadingScreen';
import { LoadingProvider } from './src/context/LoadingContext';
import { TaskRefreshProvider } from './src/context/TaskRefreshContext';
import AuthCheck from './src/components/AuthCheck';

const RootApp = () => {
  <LoadingScreen />
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