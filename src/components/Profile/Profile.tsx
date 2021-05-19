import React from 'react';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import './profile.css';

type PropsType = {
  profile: ProfileType | null;
  isProfile: boolean;
  status: string;
  updateStatus: (stutus: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const Profile: React.FC<PropsType> = ({
  profile,
  isProfile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile
}) => {
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