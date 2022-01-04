import React from 'react';

import { StatusBar, Box, NativeBaseProvider } from "native-base"

import CalculatorScreen from '@screens/Calculator';

const App = () => {
  return (
    <NativeBaseProvider>
      <Box safeArea>
        <StatusBar />
        <CalculatorScreen />
      </Box>
    </NativeBaseProvider> 
  );
};

export default App;
