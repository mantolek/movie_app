import React, { useEffect, useState, useCallback } from 'react';
import MainImage from './Components/MainImage';
import MovieCards from './Components/MovieCards';
import {
  HomeMovieInterface,
  HomeMainMovieInterface,
} from '../../types/interfaces/index';
import { IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../config/index';
import { setMoviesCall } from '../../utils/calls';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<HomeMovieInterface[]>([]);
  const [
    mainMovieImage,
    setMainMovieImage,
  ] = useState<HomeMainMovieInterface | null>(null);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState('popular');

  const fetchMovies = useCallback(
    async (page, category) => {
      try {
        const data = await setMoviesCall(page, category);
        setMovies((movie) => [...movie, ...data.results]);
        setMainMovieImage(mainMovieImage || data.results[0]);
        setCurrentPage(data.page);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data.err || err.response.data.status_message);
      }
    },
    [mainMovieImage]
  );

  useEffect(() => {
    fetchMovies(1, category);
  }, [category, fetchMovies]);

  const loadMoreItems = () => {
    setLoading(true);
    const page = currentPage + 1;
    fetchMovies(page, category);
  };

  return (
    <div className='home'>
      {mainMovieImage ? (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${mainMovieImage.backdrop_path}`}
          title={mainMovieImage.original_title}
          text={mainMovieImage.overview}
        />
      ) : <div>No poster.</div>}

      <div className='home__search'>
        <p>Current search: </p>
        <form>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value='popular'>Popular</option>
            <option value='upcoming'>Upcoming</option>
            <option value='top_rated'>Top rated</option>
          </select>
        </form>
      </div>

      <h4 className='home__title'> Movies by {category} </h4>

      <div className='home__movieList__wrapper'>
        <div className='home__movieList'>
          {movies ?
            movies.map((movie, i) => (
              <div
                key={movie.id + i}
                className='home__movieList__movie'
              >
                <MovieCards
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                      : undefined
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </div>
            )) : <div className='empty'>Movie list is empty.</div>}
        </div>

        {loading && <div className='loading'>loading...</div>}
      </div>

      <button
        type='button'
        className='btn loadMore'
        onClick={loadMoreItems}
      >
        Load More
      </button>
    </div>
  );
};

export default Home;
