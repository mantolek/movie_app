import React, { useEffect, useState, useCallback } from 'react';
import { setFavoriteCall } from '../../utils/calls';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/index';
import { FavoritesState } from '../../types/interfaces/index';
import { useHistory } from "react-router-dom";

const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoritesState[]>([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const getFavoriteMovies = useCallback(async () => {
    try {
      const data = await setFavoriteCall('getFavoredMovie');
      if (data.success) {
        setFavorites(data.favorites);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getFavoriteMovies();
  }, [getFavoriteMovies]); // // eslint-disable-line react-hooks/exhaustive-deps

  const onClickDelete = async (movieID: string) => {
    try {
      const data = await setFavoriteCall('removeFromFavorite', { movieID });
      if (data.success) {
        getFavoriteMovies();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='favorite'>
      <button className='btn' onClick={() => history.goBack()}>Go back</button>  
      <p className='favorite__title'> Favorite Movies By Me </p>

      {!loading && (
        <div className='favorite__wrapper'>
          {favorites.map((favorite, i) => (
            <div key={i} className='fav__block'>
              <div className='fav__content'>
                {favorite.moviePoster ? (
                  <img
                    alt='moviePost'
                    src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePoster}`}
                  />
                ) : (
                  'no image'
                )}
              </div>
              <p className='fav__runtime'>
                Run time: {favorite.movieRunTime}
                mins
              </p>
              <p className='fav__delete'>
                <button
                  type='button'
                  onClick={() => onClickDelete(favorite.movieID)}
                >
                  Remove
                </button>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
