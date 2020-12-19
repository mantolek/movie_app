import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { setFavoriteCall } from '../../../utils/calls';
import {
  FavoriteProps,
  FavoriteInterace,
} from '../../../types/interfaces/index';

const Favorite: React.FC<FavoriteProps> = ({ movieID, movieInfo }) => {
  const user = useSelector((state: FavoriteInterace) => state.user);

  const [favorited, setFavorited] = useState(false);

  const onClickFavorite = async () => {
    if (!user.loginSuccess) {
     console.log('login error')
    }

    if (favorited) {
      // when we are already subscribed
      try {
        const dataRemove = await setFavoriteCall('removeFromFavorite', {
            movieID,
        });
        if (dataRemove.success) {
          setFavorited(!favorited);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // when we are not subscribed yet
      try {
        const variables = {
          movieID,
          movieTitle: movieInfo.title,
          moviePoster: movieInfo.poster_path,
          movieRunTime: movieInfo.runtime,
        };

        const dataAdd = await setFavoriteCall('addToFavorite', variables);
        if (dataAdd.success) {
          setFavorited(!favorited);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getFavoritedSubscribed = useCallback(async () => {
    try {
      const data = await setFavoriteCall('favorited', { movieID });
      if (data.success) {
        setFavorited(data.success);
      }
    } catch (err) {
        console.log(err);
    }
  }, [movieID]);

  useEffect(() => {
    getFavoritedSubscribed();
  }, [getFavoritedSubscribed]); // // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='favoriteBtn'>
      {!favorited ?
        <>Add to Favorite <MdFavoriteBorder onClick={onClickFavorite} /></>
        :
        <>Delete from Favorite <MdFavorite onClick={onClickFavorite} /></>}
    </div>
  );
};

export default Favorite;
