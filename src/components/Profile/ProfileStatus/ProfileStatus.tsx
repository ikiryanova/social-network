import React, { ChangeEvent } from 'react';

import './profileStatus.css';

type PropsType = {
  status: string
  updateStatus: (status: string) => void
};

type StateType = {
  editMode: boolean,
  status: string
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  };
  
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        <div>
          {!this.state.editMode ? (
            <span onClick={this.activateEditMode} className="status_open">
              {this.props.status || 'status'}
            </span>
          ) : (
            <div>
              <input
                onChange={this.onStatusChange}
                autoFocus={true}
                onBlur={this.deactivateEditMode}
                value={this.state.status}
                className="status_edit"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileStatus
