import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="person" size={64} color="#34C759" />
        <Text style={styles.title}>Profile Screen</Text>
        <Text style={styles.subtitle}>Welcome to the Profile tab!</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProfileDetail')}
        >
          <Text style={styles.buttonText}>Go to Profile Detail</Text>
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
    backgroundColor: '#34C759',
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

