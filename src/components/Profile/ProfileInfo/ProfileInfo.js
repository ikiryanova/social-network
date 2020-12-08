import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from '../ProfileStatus/ProfileStatusWithHooks';
import userPhoto from '../../../assets/user.png';
import EditProfileDataFormRedux from './ProfileDataForm/ProfileDataForm';
import './profileInfo.css';

const ProfileInfo = ({
  profile,
  isProfile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!isProfile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData)
    .then(() => {
      setEditMode(false);
    });
  };

  return (
    <>
      <div className="profile__bcg">
        <img
          src="https://img3.goodfon.ru/wallpaper/nbig/c/73/krasota-les-peyzazh.jpg"
          alt="bacground"
        />
      </div>
      <div className="profile-info">
        <div>
          <div className="profile__avatar">
            <img src={profile.photos.large || userPhoto} alt="avatar" />
          </div>
          <div>{isOwner && <input onChange={onMainPhotoSelected} type={'file'} />}</div>
        </div>
        <div className="profile-desctiption">
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

          {editMode ? (
            <EditProfileDataFormRedux
              onSubmit={onSubmit}
              initialValues={profile}
              profile={profile}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => setEditMode(true)}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

const Contacts = ({contactTitle, contactValue}) => {
  return (
    <div className="profile-contacts">
      <span className="profile-person__type">{contactTitle}: </span>
      <span>{contactValue}</span>
    </div>
  );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
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
      {profile.lokingForAJob && (
        <p className="profile-person">
          <span className="profile-person__type">My profissional skills: </span>
          <span>{profile.lookingForAJobDescription}</span>
        </p>
      )}

      <div className="profile-person">
        <span className="profile-person__type">Contacts: </span>
        {Object.keys(profile.contacts).map((key) => (
          <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
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
}

export default ProfileInfo;