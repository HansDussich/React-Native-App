import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsDetailScreen from '../screens/SettingsDetailScreen';

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF9500',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen 
        name="SettingsDetail" 
        component={SettingsDetailScreen}
        options={{ title: 'Settings Detail' }}
      />
    </Stack.Navigator>
  );
}
