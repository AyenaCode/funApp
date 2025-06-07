import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ResumeProvider} from './src/contexts/ResumeContext';
import {AppNavigator} from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ResumeProvider>
        <AppNavigator />
      </ResumeProvider>
    </SafeAreaProvider>
  );
}

export default App;
