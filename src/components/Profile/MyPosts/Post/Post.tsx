import React from 'react';

import './post.css';

type PropsType = {
  postItem: string
} 

const Post: React.FC<PropsType> = ({ postItem  }) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <img
          src="https://vsthemes.ru/uploads/posts/2020-02/1581225730_vsthemes_ru-39.jpg"
          alt="avatar"
        />
      </div>
      <p className="post__text">{postItem}</p>
    </div>
  );
};

export default Post;