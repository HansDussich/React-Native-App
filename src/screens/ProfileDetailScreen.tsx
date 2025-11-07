import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="person-circle" size={64} color="#34C759" />
        <Text style={styles.title}>Profile Detail Screen</Text>
        <Text style={styles.description}>
          This is a detail screen within the Profile stack navigator.
          You can navigate here from the Profile screen.
        </Text>
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
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

