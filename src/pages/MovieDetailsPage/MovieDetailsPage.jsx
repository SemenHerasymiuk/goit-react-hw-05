import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const locationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTY2NzRlOWVmNjc3MDg2OTUxMGFmNmMzN2FhYjFmMiIsIm5iZiI6MTc0MjQ4ODM2MC4xMzUsInN1YiI6IjY3ZGM0MzI4OGFmNDUyZjMwZmU5ZmIzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J7jyprFsBdFQQfwyMqHOcr9T8SawWZoFrQQQgjpHJ3o'
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={css.container}>
      <Link to={locationRef.current}>← Go back</Link>
      
      <div className={css.movieInfo}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          width="300"
        />
        <div className={css.details}>
          <h2>{movie.title} ({movie.release_date.split('-')[0]})</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(' ')}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`} replace>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} replace>Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage; 