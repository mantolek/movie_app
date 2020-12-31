import React, { useEffect, useState, useCallback } from 'react';
import { setCastCall, setCommentCall, setMovieInfo } from '../../utils/calls';
import {
  MovieDetailPageProps,
  MovieState,
  CastsState,
} from '../../types/interfaces/index';
import { IMAGE_BASE_URL, IMAGE_SIZE } from '../../config/index';
import MainImage from './Components/MainImage';
import Comments from './Components/Comments';
import LikeDislikes from './Components/LikeDislikes';
import GridCards from './Components/GridCards';
import MovieInfo from './Components/MovieInfo';
import Favorite from './Components/Favorite';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changePopup } from '../../store/actions/global_actions'

const Movie: React.FC<MovieDetailPageProps> = (props) => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState<MovieState | any>([]);
  const [casts, setCasts] = useState<CastsState[]>([]);
  const [commentLists, setCommentLists] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingCasts, setLoadingCasts] = useState(true);
  const [actorToggle, setActorToggle] = useState(false);
  let history = useHistory();

  const { id }: any = props.match.params;

  const getMovieInfo = useCallback(async () => {
    // GET ONE MOVIE INFO
    try {
      setLoadingMovie(true);
      const data = await setMovieInfo(id);
      setMovie(data);
      setLoadingMovie(false);
    } catch (err) {
      dispatch(changePopup(true, 'fetch'))
    }

    // GET MOVIE ACTORS
    try {
      setLoadingCasts(true);
      const { cast } = await setCastCall(id);

      setCasts(cast);
      setLoadingCasts(false);
    } catch (err) {
      dispatch(changePopup(true, 'fetch'))
    }
  }, [id, dispatch]);

  const getComments = useCallback(async () => {
    try {
      const variable = {
        id,
      };
      const data = await setCommentCall('getComments', variable);
      setCommentLists(data.comments);
    } catch (err) {
      dispatch(changePopup(true, 'fetch'))
    }
  }, [id, dispatch]);

  useEffect(() => {
    getMovieInfo();
    getComments();
  }, [getMovieInfo, getComments]); // // eslint-disable-line react-hooks/exhaustive-deps

  const toggleActorView = () => {
    setActorToggle(!actorToggle);
  };

    const updateComment = (newComment: []) => {
      setCommentLists([...newComment, ...commentLists]);
    };

  return (
    <div className='movie'>
       <button className='btn' onClick={() => history.goBack()}>Go back</button> 
      {loadingMovie ? (
        <p>loading</p>
      ) : (
        <>
          <MainImage
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.backdrop_path}`}
            title={movie.original_title}
            text={movie.overview}
          />

          <div className='movie__info'>
            <div className='interaction'>
              {/* LIKE DISLIKES */}
              <LikeDislikes ID={id} type={'movie'}/>
              {/* FAVORITE */}
              <Favorite movieInfo={movie} movieID={id} />
            </div>

            {/* MOVIE INFO */}
            <MovieInfo movie={movie} />

            <div className='actiorViewBtn'>
              <button
                type='button'
                onClick={toggleActorView}
                className='btn toggleActor'
              >
                Toggle Actor View
              </button>
            </div>

            <div className='casts'>
              {actorToggle &&
                !loadingCasts &&
                casts.map(
                  (cast) =>
                    cast.profile_path && (
                      <GridCards image={cast.profile_path} name={cast.name} />
                    )
                )}
            </div>

            {/* COMMENTS */}
            <Comments
              movieTitle={movie.original_title}
              commentLists={commentLists}
              postId={id}
              refreshFunction={updateComment}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
