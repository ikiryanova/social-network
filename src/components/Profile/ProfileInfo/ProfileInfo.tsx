import React, { ChangeEvent, useState } from 'react';

import { ContactsType, ProfileType } from '../../../types/types';
import EditProfileDataFormRedux from './ProfileDataForm/ProfileDataForm';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import userPhoto from '../../../assets/user.png';

import './profileInfo.css';

type PropsType = {
  profile: ProfileType | null;
  isProfile: boolean;
  status: string;
  updateStatus: (stutus: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  isProfile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!isProfile || !profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData)
    .then(() => {
      setEditMode(false);
    });
  };

  return (
    <>
      <div className="profile__bcg">
        <img src="https://img3.goodfon.ru/wallpaper/nbig/c/73/krasota-les-peyzazh.jpg" alt="bacground" />
      </div>
      <div className="profile-info">
        <div>
          <div className="profile__avatar">
            <img src={profile.photos.large || userPhoto} alt="avatar" />
          </div>
          <div>{isOwner && <input onChange={onMainPhotoSelected} type={'file'} />}</div>
        </div>
        <div className="profile-desctiption">
          <ProfileStatus status={status} updateStatus={updateStatus} />

          {editMode ? (
            <EditProfileDataFormRedux onSubmit={onSubmit} initialValues={profile} profile={profile} />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => setEditMode(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};

type ContactsPropsType = {
  contactTitle: string,
  contactValue: string | null
}

const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return (
    <div className="profile-contacts">
      <span className="profile-person__type">{contactTitle}: </span>
      <span>{contactValue}</span>
    </div>
  );
}

type ProfileDataPropsType = {
  profile: ProfileType,
  isOwner: boolean,
  goToEditMode: () => void,
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return (
    <>
      <p className="profile-person">
        <span className="profile-person__type">Full name: </span>
        <span>{profile.fullName}</span>
      </p>
      <p className="profile-person">
        <span className="profile-person__type">About me: </span>
        <span>{profile.aboutMe}</span>
      </p>
      <p className="profile-person">
        <span className="profile-person__type">Looking for a job: </span>
        <span>{profile.lookingForAJob ? 'yes' : 'no'}</span>
      </p>
      {profile.lookingForAJob && (
        <p className="profile-person">
          <span className="profile-person__type">My profissional skills: </span>
          <span>{profile.lookingForAJobDescription}</span>
        </p>
      )}

      <div className="profile-person">
        <span className="profile-person__type">Contacts: </span>
        {Object.keys(profile.contacts).map((key) => (
          <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
        ))}
      </div>

      {isOwner && (
        <div>
          <button onClick={goToEditMode} className="btn btn-profile-info">
            Edit
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;