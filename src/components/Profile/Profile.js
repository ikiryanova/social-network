import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import './profile.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({ profile, isProfile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
  return (
    <div className="profile">
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        isProfile={isProfile}
        status={status}
        updateStatus={updateStatus}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;