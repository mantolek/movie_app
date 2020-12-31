import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { setLikeCall } from '../../../utils/calls';
import {
  LikeDislikesProps,
  LikeDislikesInterace,
} from '../../../types/interfaces/index';
import { changePopup } from '../../../store/actions/global_actions';

const LikeDislikes: React.FC<LikeDislikesProps> = ({ ID, type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: LikeDislikesInterace) => state.user);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(false);
  const [dislikeAction, setDislikeAction] = useState(false);

  interface likeAndDislike {
    commentID?: string;
    movieID?: string;
  }

  const getLikes = useCallback(async () => {
    try {
      // set likes length
      const data = await setLikeCall('getLikes', ID, type);
      setLikes(data.likes.length);
      // check if liked before
      const myLike = localStorage.getItem(`${ID}-like`);
      // if liked before set like action to true
      data.likes.map((like: likeAndDislike) =>
        type === 'comment'
          ? like.commentID === myLike && setLikeAction(true)
          : like.movieID === myLike && setLikeAction(true)
      );
    } catch (err) {
      dispatch(changePopup(true, 'fetch'));
    }
  }, [ID, type, dispatch]);

  const getDisLikes = useCallback(async () => {
    try {
      // get dislike length
      const data = await setLikeCall('getDislikes', ID, type);
      setDislikes(data.dislikes.length);
      // check if disliked before
      const myDislike = localStorage.getItem(`${ID}-dislike`);
      // if disliked before set dislike action to true
      data.dislikes.map((dislike: likeAndDislike) =>
        type === 'comment'
          ? dislike.commentID === myDislike && setDislikeAction(true)
          : dislike.movieID === myDislike && setDislikeAction(true)
      );
    } catch (err) {
      dispatch(changePopup(true, 'fetch'));
    }
  }, [ID, type]);

  useEffect(() => {
    getLikes();
    getDisLikes();
  }, [getLikes, getDisLikes]); // // eslint-disable-line react-hooks/exhaustive-deps

  // ON LIKE
  const onLike = async () => {
    if (!user.loginSuccess) {
      dispatch(changePopup(true, 'login'));
    }

    if (!likeAction) {
      // if not liked before
      try {
        const data = await setLikeCall('upLike', ID, type);
        if (data.success) {
          setLikes(likes + 1);
          setLikeAction(true);
          localStorage.setItem(`${ID}-like`, ID);

          // If dislike button is already clicked; reset
          if (dislikeAction) {
            setDislikes(dislikes - 1);
            setDislikeAction(false);
            localStorage.removeItem(`${ID}-dislike`);
          }
        }
      } catch (err) {
        dispatch(changePopup(true, 'fetch'));
      }
    } else {
      // if liked before; dislike
      try {
        const data = await setLikeCall('unLike', ID, type);
        if (data.success) {
          setLikes(likes - 1);
          setLikeAction(false);
          localStorage.removeItem(`${ID}-like`);
        }
      } catch (err) {
        dispatch(changePopup(true, 'fetch'));
      }
    }
  };

  const onDisLike = async () => {
    if (!user.loginSuccess) {
      dispatch(changePopup(true, 'login'));
    }

    if (!dislikeAction) {
      // if not disliked before
      try {
        const data = await setLikeCall('upDisLike', ID, type);
        if (data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction(true);
          localStorage.setItem(`${ID}-dislike`, ID);

          // If like button is already clicked; reset
          if (likeAction) {
            setLikes(likes - 1);
            setLikeAction(false);
            localStorage.removeItem(`${ID}-like`);
          }
        }
      } catch (err) {
        dispatch(changePopup(true, 'fetch'));
      }
    } else {
      // if disliked before; reset
      try {
        const data = await setLikeCall('unDisLike', ID, type);

        if (data.success) {
          setDislikes(dislikes - 1);
          setDislikeAction(false);
          localStorage.removeItem(`${ID}-dislike`);
        }
      } catch (err) {
        dispatch(changePopup(true, 'fetch'));
      }
    }
  };

  return (
    <div className='likeDisLike'>
      <AiOutlineLike onClick={onLike} />
      <span>{likes}</span>

      <AiOutlineDislike onClick={onDisLike} />
      <span>{dislikes}</span>
    </div>
  );
};

export default LikeDislikes;
