import { NavLink } from 'react-router-dom';
import React from 'react';
import userPhoto from '../../../assets/user.png';
import './user.css';

const User = ({ user, followingInProgress, follow, unfollow }) => {
  return (
    <div className="user">
      <div className="user-avatar">
        <NavLink to={`/profile/${user.id}`}>
          <div className="user__avatar">
            <img src={user.photos.small ? user.photos.small : userPhoto} alt={user.fullName} />
          </div>
        </NavLink>
        {user.followed ? (
          <button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => unfollow(user.id)}
            className="btn user-btn">
            Unfollow
          </button>
        ) : (
          <button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => follow(user.id)}
            className="btn user-btn">
            Follow
          </button>
        )}
      </div>
      <div className="user-desc">
        <div className="user-desc__text">
          <span className="user__item">{user.name}</span>
          <span className="user__status">{user.status}</span>
        </div>
        <div className="user-desc__text">
          <span className="user__item">{'user.location.country'}</span>
          <span className="user__item">{'user.location.city'}</span>
        </div>
      </div>
    </div>
  );
}

export default User;