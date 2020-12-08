import React from 'react'
import './profileStatus.css'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }
  
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

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  }


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
