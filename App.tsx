// Root App.tsx
import React from 'react';
import App from './src/App';
import LoadingScreen from './src/components/common/LoadingScreen';
import { LoadingProvider } from './src/context/LoadingContext';

const RootApp = () => {
  <LoadingScreen />
  return (
    <LoadingProvider>
      <App />
    </LoadingProvider>
  );
};

export default RootApp;