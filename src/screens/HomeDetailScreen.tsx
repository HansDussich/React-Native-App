import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { getMovieDetail, getImageUrl, formatDate, formatRating, MovieDetail } from '../services/movieService';
import {
  notifyMovieSaved,
  notifyMovieRemoved,
  scheduleMovieReminder,
} from '../services/notificationService';

export default function HomeDetailScreen({ route, navigation }: any) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const movieId = route.params?.movieId;
  const initialMovie = route.params?.movie;

  useEffect(() => {
    loadMovieDetail();
  }, [movieId]);

  useEffect(() => {
    if (movie) {
      checkIfFavorite();
    }
  }, [movie]);

  const loadMovieDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      if (movieId) {
        const data = await getMovieDetail(movieId);
        setMovie(data);
      }
    } catch (err) {
      setError('No se pudieron cargar los detalles de la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteMovies');
      const favoritesList = favorites ? JSON.parse(favorites) : [];
      const isFav = favoritesList.some((m: any) => m.id === movie?.id);
      setIsFavorite(isFav);
    } catch (error) {
      console.error('Error al verificar favoritos:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteMovies');
      let favoritesList = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        // Remover de favoritos
        favoritesList = favoritesList.filter((m: any) => m.id !== movie?.id);
        setIsFavorite(false);
        notifyMovieRemoved(movie?.title || 'Película');
      } else {
        // Añadir a favoritos
        if (movie) {
          favoritesList.push({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
          });
          setIsFavorite(true);
          notifyMovieSaved(movie.title);
        }
      }

      await AsyncStorage.setItem('favoriteMovies', JSON.stringify(favoritesList));
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  };

  const handleReminder = () => {
    if (movie) {
      scheduleMovieReminder(movie.title, 5);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={64} color="#FF3B30" />
          <Text style={styles.errorText}>{error || 'No se encontró la película'}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Poster */}
      <View style={styles.posterSection}>
        {movie.poster_path ? (
          <Image
            source={{ uri: getImageUrl(movie.poster_path, 500) || '' }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.noPosterContainer]}>
            <Ionicons name="image-outline" size={60} color="#999" />
          </View>
        )}
        <View style={styles.posterOverlay}>
          <View style={styles.ratingLarge}>
            <Ionicons name="star" size={24} color="#FFD700" />
            <Text style={styles.ratingLargeText}>{formatRating(movie.vote_average)}</Text>
          </View>
        </View>
      </View>

      {/* Información Principal */}
      <View style={styles.content}>
        <View style={styles.headerWithActions}>
          <Text style={styles.title}>{movie.title}</Text>
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={toggleFavorite}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF3B30' : '#007AFF'}
            />
          </TouchableOpacity>
        </View>

        {movie.tagline && <Text style={styles.tagline}>"{movie.tagline}"</Text>}

        {/* Botones de Acción Rápida */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={toggleFavorite}>
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color="#fff" />
            <Text style={styles.actionButtonText}>
              {isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]} onPress={handleReminder}>
            <Ionicons name="alarm" size={18} color="#007AFF" />
            <Text style={styles.actionButtonTextSecondary}>Recordatorio (5s)</Text>
          </TouchableOpacity>
        </View>

        {/* Información Rápida */}
        <View style={styles.quickInfoContainer}>
          {movie.release_date && (
            <View style={styles.infoBox}>
              <Ionicons name="calendar" size={20} color="#007AFF" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Estreno</Text>
                <Text style={styles.infoValue}>{formatDate(movie.release_date)}</Text>
              </View>
            </View>
          )}

          {movie.runtime && (
            <View style={styles.infoBox}>
              <Ionicons name="time" size={20} color="#007AFF" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Duración</Text>
                <Text style={styles.infoValue}>{movie.runtime} minutos</Text>
              </View>
            </View>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.infoBox}>
              <Ionicons name="layers" size={20} color="#007AFF" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Géneros</Text>
                <Text style={styles.infoValue}>{movie.genres.map((g) => g.name).join(', ')}</Text>
              </View>
            </View>
          )}

          {movie.popularity && (
            <View style={styles.infoBox}>
              <Ionicons name="flame" size={20} color="#FF3B30" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Popularidad</Text>
                <Text style={styles.infoValue}>{Math.round(movie.popularity)}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Descripción */}
        {movie.overview && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sinopsis</Text>
            <Text style={styles.description}>{movie.overview}</Text>
          </View>
        )}

        {/* Estado */}
        {movie.status && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estado</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{movie.status}</Text>
            </View>
          </View>
        )}

        {/* Presupuesto y Ingresos */}
        {(movie.budget || movie.revenue) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Finanzas</Text>
            <View style={styles.financesContainer}>
              {movie.budget ? (
                <View style={styles.financeBox}>
                  <Text style={styles.financeLabel}>Presupuesto</Text>
                  <Text style={styles.financeValue}>
                    ${(movie.budget / 1000000).toFixed(1)}M
                  </Text>
                </View>
              ) : null}
              {movie.revenue ? (
                <View style={styles.financeBox}>
                  <Text style={styles.financeLabel}>Ingresos</Text>
                  <Text style={styles.financeValue}>
                    ${(movie.revenue / 1000000).toFixed(1)}M
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        )}

        {/* Botón Volver */}
        <TouchableOpacity
          style={styles.backButtonLarge}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <Text style={styles.backButtonTextLarge}>Volver a películas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginTop: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  posterSection: {
    position: 'relative',
    backgroundColor: '#e8e8e8',
    height: width * 0.6,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  noPosterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
  },
  posterOverlay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  ratingLarge: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingLargeText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  quickInfoContainer: {
    marginBottom: 20,
    gap: 12,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  statusBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  financesContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  financeBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  financeLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  financeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonLarge: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    gap: 8,
  },
  backButtonTextLarge: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    height: 20,
  },
  headerWithActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  actionButtonTextSecondary: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 13,
  },
});

