// Root App.tsx
import React from 'react';
import App from './src/App';
import LoadingScreen from './src/components/common/LoadingScreen';

const RootApp = () => {
  <LoadingScreen />
  return <App />;
};

export default RootApp;