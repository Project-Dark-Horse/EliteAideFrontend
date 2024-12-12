// Root App.tsx
import React from 'react';
import App from './src/App';
import LoadingScreen from './src/components/common/LoadingScreen';
import { LoadingProvider } from './src/context/LoadingContext';
import { TaskRefreshProvider } from './src/context/TaskRefreshContext';

const RootApp = () => {
  <LoadingScreen />
  return (
    <TaskRefreshProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </TaskRefreshProvider>
  );
};

export default RootApp;