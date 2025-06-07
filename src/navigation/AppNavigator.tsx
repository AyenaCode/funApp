import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

// Import des écrans pour la navigation
import ContactScreen from '../views/ContactScreen';
import EducationScreen from '../views/EducationScreen';
import ExperienceScreen from '../views/ExperienceScreen';
import HomeScreen from '../views/HomeScreen';
import SkillsScreen from '../views/SkillsScreen';

export type RootStackParamList = {
  Home: undefined;
  Experience: undefined;
  Skills: undefined;
  Education: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Mon CV'}}
        />
        <Stack.Screen
          name="Experience"
          component={ExperienceScreen}
          options={{title: 'Expérience'}}
        />
        <Stack.Screen
          name="Skills"
          component={SkillsScreen}
          options={{title: 'Compétences'}}
        />
        <Stack.Screen
          name="Education"
          component={EducationScreen}
          options={{title: 'Formation'}}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{title: 'Contact'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
