// App.js
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { LanguageProvider } from './src/context/LanguageContext'; 

const App = () => {
  return (
    <LanguageProvider>
      <AppNavigation />
    </LanguageProvider>
  );
};

export default App;
