import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTY2NzRlOWVmNjc3MDg2OTUxMGFmNmMzN2FhYjFmMiIsIm5iZiI6MTc0MjQ4ODM2MC4xMzUsInN1YiI6IjY3ZGM0MzI4OGFmNDUyZjMwZmU5ZmIzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J7jyprFsBdFQQfwyMqHOcr9T8SawWZoFrQQQgjpHJ3o'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    searchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;
    setSearchParams(searchQuery !== '' ? { query: searchQuery } : {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </div>
  );
};

export default MoviesPage; 