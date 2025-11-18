import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  notifySuccess,
  notifyError,
  notifyNewMovies,
  scheduleMovieReminder,
  cancelAllNotifications,
  getScheduledNotifications,
  initializeNotifications,
} from '../services/notificationService';

export default function SettingsScreen({ navigation }: any) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [scheduledCount, setScheduledCount] = useState(0);

  useEffect(() => {
    checkNotifications();
    initializeNotifications();
  }, []);

  const checkNotifications = async () => {
    const notifications = await getScheduledNotifications();
    setScheduledCount(notifications.length);
  };

  const handleTestNotification = () => {
    notifySuccess('¡Hola! Esta es una notificación de prueba.');
    setTimeout(() => checkNotifications(), 1500);
  };

  const handleMovieNotification = () => {
    notifyNewMovies(15);
    setTimeout(() => checkNotifications(), 1500);
  };

  const handleReminderNotification = () => {
    scheduleMovieReminder('Avatar: El Camino del Agua', 2);
    setTimeout(() => checkNotifications(), 1500);
  };

  const handleClearNotifications = async () => {
    await cancelAllNotifications();
    setScheduledCount(0);
    notifySuccess('Todas las notificaciones fueron canceladas');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="settings" size={32} color="#FF9500" />
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      {/* Sección de Notificaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notificaciones</Text>

        <View style={styles.settingBox}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Habilitar Notificaciones</Text>
            <Text style={styles.settingDescription}>
              Recibe alertas y recordatorios
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ddd', true: '#81C784' }}
            thumbColor={notificationsEnabled ? '#4CAF50' : '#bbb'}
          />
        </View>

        {/* Estado de Notificaciones */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#007AFF" />
          <Text style={styles.infoText}>
            Notificaciones programadas: <Text style={styles.infoBold}>{scheduledCount}</Text>
          </Text>
        </View>

        <Text style={styles.subsectionTitle}>Prueba de Notificaciones</Text>

        {/* Botones de Prueba */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={handleTestNotification}
          disabled={!notificationsEnabled}
        >
          <Ionicons name="checkmark-circle" size={20} color="#34C759" />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Notificación de Éxito</Text>
            <Text style={styles.buttonDescription}>Mensaje de confirmación</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.testButton}
          onPress={handleMovieNotification}
          disabled={!notificationsEnabled}
        >
          <Ionicons name="film" size={20} color="#FF3B30" />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Nuevas Películas</Text>
            <Text style={styles.buttonDescription}>Notificación sobre películas</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.testButton}
          onPress={handleReminderNotification}
          disabled={!notificationsEnabled}
        >
          <Ionicons name="alarm" size={20} color="#FF9500" />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Recordatorio de Película</Text>
            <Text style={styles.buttonDescription}>Se enviará en 2 segundos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.testButton, styles.dangerButton]}
          onPress={handleClearNotifications}
        >
          <Ionicons name="trash" size={20} color="#fff" />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabelDanger}>Limpiar Notificaciones</Text>
            <Text style={styles.buttonDescriptionDanger}>
              Cancela todas las notificaciones programadas
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sección de Películas Favoritas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❤️ Películas Favoritas</Text>

        <TouchableOpacity
          style={styles.navigateButton}
          onPress={() => navigation.navigate('SettingsDetail')}
        >
          <Ionicons name="heart" size={20} color="#FF3B30" />
          <Text style={styles.navigateButtonText}>Ver Mis Películas Favoritas</Text>
          <Ionicons name="chevron-forward" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Sección de Información */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Información</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Versión de la App</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fuente de Datos</Text>
            <Text style={styles.infoValue}>The Movie DB</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tecnología</Text>
            <Text style={styles.infoValue}>React Native + Expo</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 12,
  },
  settingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  infoBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  buttonContent: {
    flex: 1,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  buttonDescription: {
    fontSize: 12,
    color: '#999',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
    marginTop: 8,
  },
  buttonLabelDanger: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  buttonDescriptionDanger: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 14,
    borderRadius: 8,
    gap: 12,
  },
  navigateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  infoSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    height: 20,
  },
});

