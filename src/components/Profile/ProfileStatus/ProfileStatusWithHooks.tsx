import React, { ChangeEvent, useEffect, useState } from 'react';

import './profileStatus.css';

type PropsType = {
  status: string,
  updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = ({ status, updateStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [statusLocal, setStatus] = useState(status);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(statusLocal);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode ? (
        <>
          <span className="profile-person__type">Status: </span>
          <span onClick={activateEditMode} className="status_open profile-person__status">
            {status || 'status'}
          </span>
        </>
      ) : (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
            className="status_edit"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
