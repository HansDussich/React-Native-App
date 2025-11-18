import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPopularMovies, getImageUrl, formatRating, Movie } from '../services/movieService';

export default function HomeScreen({ navigation }: any) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async (page: number = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      const data = await getPopularMovies(page);
      if (page === 1) {
        setMovies(data);
      } else {
        setMovies((prev) => [...prev, ...data]);
      }
      setCurrentPage(page);
    } catch (err) {
      setError('No se pudieron cargar las películas');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && !loading) {
      loadMovies(currentPage + 1);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('HomeDetail', { movieId: movie.id, movie });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando películas...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={64} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => loadMovies(1)}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="film" size={32} color="#007AFF" />
        <Text style={styles.headerTitle}>Películas Populares</Text>
      </View>

      <View style={styles.moviesGrid}>
        {movies.map((movie: Movie) => (
          <TouchableOpacity
            key={movie.id}
            style={styles.movieCard}
            onPress={() => handleMoviePress(movie)}
            activeOpacity={0.7}
          >
            <View style={styles.posterContainer}>
              {movie.poster_path ? (
                <Image
                  source={{ uri: getImageUrl(movie.poster_path) || '' }}
                  style={styles.poster}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.poster, styles.noPosterContainer]}>
                  <Ionicons name="image-outline" size={40} color="#999" />
                </View>
              )}
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{formatRating(movie.vote_average)}</Text>
              </View>
            </View>

            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {movie.title}
              </Text>
              <Text style={styles.movieYear}>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </Text>
              <View style={styles.viewMoreContainer}>
                <Text style={styles.viewMoreText}>Ver detalles</Text>
                <Ionicons name="chevron-forward" size={16} color="#007AFF" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones de Paginación */}
      <View style={styles.paginationContainer}>
        {loadingMore ? (
          <View style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingMoreText}>Cargando más películas...</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.loadMoreButtonText}>Cargar Más Películas</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

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
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
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
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  movieCard: {
    width: cardWidth,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  posterContainer: {
    position: 'relative',
    backgroundColor: '#e8e8e8',
  },
  poster: {
    width: '100%',
    height: cardWidth * 1.5,
    backgroundColor: '#e8e8e8',
  },
  noPosterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 12,
  },
  movieInfo: {
    padding: 12,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewMoreText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  footer: {
    height: 20,
  },
  paginationContainer: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  loadingMoreText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  loadMoreButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  loadMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

