// Servicio para obtener datos de The Movie DB API
const API_KEY = 'b5b00bb29b3df8d2abdd4a4f6d99454d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  genre_ids?: number[];
}

export interface MovieDetail extends Movie {
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  tagline?: string;
}

// Obtener películas populares
export const getPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=es-ES`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener películas');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error en getPopularMovies:', error);
    throw error;
  }
};

// Obtener películas en cartel
export const getUpcomingMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}&language=es-ES`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener películas próximas');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error en getUpcomingMovies:', error);
    throw error;
  }
};

// Obtener top películas
export const getTopRatedMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=es-ES`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener películas top');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error en getTopRatedMovies:', error);
    throw error;
  }
};

// Obtener detalles de una película específica
export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener detalles de la película');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getMovieDetail:', error);
    throw error;
  }
};

// Obtener URL completa de la imagen de la película
export const getImageUrl = (posterPath: string | null, width: number = 500): string | null => {
  if (!posterPath) return null;
  return `${IMAGE_BASE_URL}${posterPath}`;
};

// Función auxiliar para formatear calificación
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Función auxiliar para formatear fecha
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Fecha no disponible';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
