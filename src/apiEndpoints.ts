const API_BASE = 'https://localhost:32827/api/v1';

export const MOVIES_LIST_ENDPOINT = `${API_BASE}/movies`;
export const MOVIE_DETAILS_ENDPOINT = (id: string,guid:string) => `${API_BASE}/movie/${id}/${guid}`;
