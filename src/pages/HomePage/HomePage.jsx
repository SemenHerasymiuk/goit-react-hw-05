import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTY2NzRlOWVmNjc3MDg2OTUxMGFmNmMzN2FhYjFmMiIsIm5iZiI6MTc0MjQ4ODM2MC4xMzUsInN1YiI6IjY3ZGM0MzI4OGFmNDUyZjMwZmU5ZmIzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J7jyprFsBdFQQfwyMqHOcr9T8SawWZoFrQQQgjpHJ3o'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} location={location} />
    </div>
  );
};

export default HomePage; 