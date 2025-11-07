import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="home" size={64} color="#007AFF" />
        <Text style={styles.title}>Home Screen</Text>
        <Text style={styles.subtitle}>Welcome to the Home tab!</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeDetail')}
        >
          <Text style={styles.buttonText}>Go to Home Detail</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

