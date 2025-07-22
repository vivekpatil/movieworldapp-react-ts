import { MOVIES_LIST_ENDPOINT, MOVIE_DETAILS_ENDPOINT } from './apiEndpoints';
import { apiRequest } from './apiClient';
import type { Movie } from './App';
// Removed stub import

export async function fetchMovies(): Promise<Movie[]> {
  const data = await apiRequest(MOVIES_LIST_ENDPOINT);
  if (Array.isArray(data)) {
    return data.map((m: any) => ({
      Title: m.title,
      Year: m.year,
      ID: m.id,
      Type: m.type,
      Poster: m.poster,
      guid: m.guid, // Ensure guid is included
    }));
  }
  throw new Error('No movies found.');
}

export async function fetchMovieDetails(id: string,guid:string): Promise<any> {
  const url = MOVIE_DETAILS_ENDPOINT(id,guid);
  const data = await apiRequest(url);
  return data;
}
