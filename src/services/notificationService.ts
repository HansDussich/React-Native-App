import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configurar el manejador de notificaciones cuando la app está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Inicializar las notificaciones
export const initializeNotifications = async () => {
  try {
    // Solicitar permisos de notificaciones
    if (Platform.OS === 'android') {
      // Para Android 13+ se necesita solicitar permisos
      await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
    } else {
      // Para iOS
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        console.log('✅ Permisos de notificaciones concedidos');
      }
    }
  } catch (error) {
    console.error('Error al inicializar notificaciones:', error);
  }
};

// Enviar una notificación local simple
export const sendNotification = async (
  title: string,
  body: string,
  delay: number = 1000
) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        badge: 1,
        vibrate: [0, 250, 250, 250],
        data: {
          timestamp: new Date().toISOString(),
        },
      },
      trigger: null,
    });
    console.log('✅ Notificación programada:', title);
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
};

// Notificación para película favorita guardada
export const notifyMovieSaved = (movieTitle: string) => {
  sendNotification(
    '🎬 Película Guardada',
    `"${movieTitle}" ha sido añadida a favoritos`,
    500
  );
};

// Notificación para película removida de favoritos
export const notifyMovieRemoved = (movieTitle: string) => {
  sendNotification(
    '❌ Película Removida',
    `"${movieTitle}" ha sido removida de favoritos`,
    500
  );
};

// Notificación para recordatorio de película
export const scheduleMovieReminder = (
  movieTitle: string,
  delayInSeconds: number = 60
) => {
  sendNotification(
    '⏰ Recordatorio de Película',
    `No olvides ver: "${movieTitle}"`,
    delayInSeconds * 1000
  );
};

// Notificación general de éxito
export const notifySuccess = (message: string) => {
  sendNotification('✅ ¡Éxito!', message, 500);
};

// Notificación general de error
export const notifyError = (message: string) => {
  sendNotification('⚠️ Error', message, 500);
};

// Notificación para nuevas películas disponibles
export const notifyNewMovies = (count: number = 20) => {
  sendNotification(
    '🎉 Nuevas Películas',
    `Se cargaron ${count} nuevas películas populares`,
    500
  );
};

// Notificación informativa
export const notifyInfo = (title: string, message: string) => {
  sendNotification(title, message, 500);
};

// Cancelar todas las notificaciones
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('✅ Todas las notificaciones fueron canceladas');
  } catch (error) {
    console.error('Error al cancelar notificaciones:', error);
  }
};

// Obtener las notificaciones programadas
export const getScheduledNotifications = async () => {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    return notifications;
  } catch (error) {
    console.error('Error al obtener notificaciones programadas:', error);
    return [];
  }
};
