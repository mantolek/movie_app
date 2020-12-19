import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setCommentCall } from '../../../utils/calls';
import {
  CommentsProps,
  CommentsInterface,
} from '../../../types/interfaces/index';
import LikeDislikes from './LikeDislikes'

const Comments: React.FC<CommentsProps> = ({
  movieTitle,
  commentLists,
  postId,
  refreshFunction,
}) => {
  const user = useSelector((state: CommentsInterface) => state.user);
  const [comment, setComment] = useState('');
    console.log(commentLists,'commentLists')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!user.loginSuccess) {
      console.log('error login');
    }

    const variables = {
      content: comment,
      postId,
    };

    try {
      const data = await setCommentCall('saveComment', variables);
      if (data.success) {
        setComment('');
        refreshFunction(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='comments'>
      <h3 className='comments__title'>
        <span>Share your opinions about</span>
        {movieTitle}
      </h3>

      {commentLists && commentLists.length === 0 ? (
        <div className='comments__initial'>
          Be the first one who shares your thought about this movie
        </div>
      ) : (
        <div className='comments__initial'>Comments</div>
      )}

      {commentLists &&
        commentLists.map((com: any) => (
          <div key={com._id} className='comment'>
            <div className='comment__content'>
              <span>User: {com.author.name}</span>
              <span>content: {com.content}</span>
            </div>
            <LikeDislikes ID={com._id} type={'comment'}/>
          </div>
        ))}

      <form style={{ display: 'flex' }} className='comments__form'>
        <input type='textarea' onChange={handleChange} value={comment} />
        <button type='button' onClick={(e) => onSubmit(e)} className='btn2'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comments;
