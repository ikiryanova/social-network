import React, { useEffect, useState } from 'react'
import './profileStatus.css'

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div>
      {!editMode ? (
        <>
          <span className="profile-person__type">Status: </span>
          <span onClick={activateEditMode} className="status_open profile-person__status">
            {props.status || 'status'}
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
}

export default ProfileStatusWithHooks;
