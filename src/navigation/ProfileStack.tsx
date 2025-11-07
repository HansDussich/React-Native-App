import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#34C759',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="ProfileDetail" 
        component={ProfileDetailScreen}
        options={{ title: 'Profile Detail' }}
      />
    </Stack.Navigator>
  );
}
