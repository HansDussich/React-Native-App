import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HomeDetailScreen from '../screens/HomeDetailScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="HomeDetail" 
        component={HomeDetailScreen}
        options={{ title: 'Home Detail' }}
      />
    </Stack.Navigator>
  );
}
