import React, { useEffect, useState } from 'react';
// ...existing code...
import './App.css';
import { fetchMovies, fetchMovieDetails } from './apiService';

export type Movie = {
  Title: string;
  Year: string;
  ID: string;
  Type: string;
  Poster: string;
  guid: string;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const detailsPanelRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleMovieClick = async (movie: Movie) => {
    setSelectedMovie(movie);
    setDetailsLoading(true);
    setDetailsError(null);
    try {
      const detailsData = await fetchMovieDetails(movie.ID, movie.guid);

      setDetails(detailsData);
      // Capture price from detailsData
      setPrice(detailsData?.price ?? null);
      setTimeout(() => {
        if (detailsPanelRef.current) {
          detailsPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    } catch (err: any) {
      setDetailsError(err.message);
      setDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
      <div className="App">
        <header className="App-header" style={{ position: 'relative', paddingBottom: '16px' }}>
          {/* Banner Section */}
          <div>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h1 style={{ fontFamily: 'Impact, Arial', fontSize: '2.5rem', color: '#ff0000ff', textShadow: '2px 2px 8px #222' }}>Movie World</h1>
            <div>
              <span style={{ fontSize: '1.1rem', color: '#ff0000ff', fontWeight: 'bold' }}>Welcome to Movie World! Discover movies, view details, and enjoy exclusive offers.</span>
            </div>
          </div>
          {/* Contact Info Section */}
          <div style={{ textAlign: 'center', background: '#333', color: '#fff', padding: '8px 0', borderRadius: '6px', margin: '0 auto', maxWidth: '500px', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Contact:</span>
            <span style={{ marginLeft: '8px' }}>
              <a href="mailto:support@movieworld.com" style={{ color: '#ff0000ff', textDecoration: 'underline' }}>support@movieworld.com</a>
              <span style={{ margin: '0 8px' }}>|</span>
              <a href="tel:+1234567890" style={{ color: '#ff0000ff', textDecoration: 'underline' }}>+1 234 567 890</a>
            </span>
          </div>
          </div>
        {/* Main Content: Movie List Left, Details Right */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
          {/* Movie Grid Left */}
          <div style={{ flex: selectedMovie ? '0 0 50%' : '0 0 100%', maxWidth: selectedMovie ? '50%' : '100%', textAlign: 'left', transition: 'flex 0.3s, max-width 0.3s' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', width: '100%' }}>
                <div className="spinner" style={{ width: '250px', height: '250px', border: '6px solid #eee', borderTop: '6px solid #007bff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <span style={{ marginLeft: '16px' }}>Loading movies...</span>
              </div>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexWrap: 'wrap' }}>
                {movies.map((movie: Movie) => (
                    <li
                      key={movie.ID}
                      onClick={() => handleMovieClick(movie)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '16px', marginBottom: '16px', cursor: 'pointer' }}
                    >
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        onError={e => { (e.currentTarget as HTMLImageElement).src = '/Default_Image.png'; }}
                        style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                      />
                      <div style={{ textAlign: 'center', marginTop: '8px' }}>
                        <h2 style={{ fontSize: '1rem', margin: '0 0 4px 0' }}>{movie.Title}</h2>
                        <p style={{ margin: 0 }}>Year: {movie.Year}</p>
                        <p style={{ margin: 0 }}>Type: {movie.Type}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Details Right - MovieDetails view */}
            {selectedMovie && (
              <div ref={detailsPanelRef} style={{ flex: '0 0 50%', maxWidth: '50%', textAlign: 'left', transition: 'flex 0.3s, max-width 0.3s' }}>
                {detailsLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '100%' }}>
                    <div className="spinner" style={{ width: '32px', height: '32px', border: '4px solid #eee', borderTop: '4px solid #007bff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <span style={{ marginLeft: '12px', color: '#fff', fontSize: '0.8rem' }}>Loading details...</span>
                  </div>
                ) : detailsError ? (
                  <p style={{ color: 'red', fontSize: '0.8rem' }}>{detailsError}</p>
                ) : details ? (
                <div>
                  {/* Movie Details Header Section */}
                  <div>
                    {/* Poster, Title, and Year in header from MovieList (selectedMovie) */}
                    {selectedMovie?.Poster && (
                      <img
                        src={selectedMovie.Poster}
                        alt={selectedMovie.Title}
                        onError={e => { (e.currentTarget as HTMLImageElement).src = '/Default_Image.png'; }}
                      />
                    )}
                    <div>
                      <h2>
                        {selectedMovie?.Title}
                        <div className="oval-image">
                          {price && (
                            <span className='neon-text'>
                                  $ {price}
                            </span>
                          )}
                        </div>
                      </h2>
                      {selectedMovie?.Year && (
                        <span>Year: {selectedMovie.Year}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <table style={{ width: '90%', borderCollapse: 'collapse', border: '1px solid #888' }}>
                      <tbody>
                        
                        {/* Display details in key-value pairs, excluding certain fields and hiding null/empty values */}
                        {Object.entries(details)
                          .filter(([key, value]) => {
                            // Exclude keys and hide rows with null, undefined, or empty string values
                            const excluded = ["Poster", "Title", "Year", "Type", "Genre", "Plot", "ID", "Price"].includes(key);
                            const isEmpty = value === null || value === undefined || value === '';
                            return !excluded && !isEmpty;
                          })
                          .map(([key, value]) => (
                            <tr key={key}>
                              <td style={{ border: '1px solid #888', padding: '6px 8px', fontWeight: 'bold' }}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </td>
                              <td style={{ border: '1px solid #888', padding: '6px 8px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{String(value)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {details.Plot && (
                    <div>
                      <h3>Plot</h3>
                      <p>{details.Plot}</p>
                    </div>
                  )}
                </div>
              ) : selectedMovie ? (
                <p style={{ color: '#fff' }}>Select a movie to see details.</p>
              ) : (
                <p style={{ color: '#fff' }}>Click a movie to view details.</p>
              )}
            </div>
            )}
          </div>
        </header>
        <footer style={{ width: '100%', textAlign: 'center', padding: '16px 0', background: '#222', color: '#fff', fontSize: '0.9rem', marginTop: '24px' }}>
          &copy; {new Date().getFullYear()} MovieWorld. All rights reserved.
        </footer>
      </div>
    );
}
export default App;
