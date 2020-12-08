import { reduxForm } from "redux-form";
import { reqired } from "../../../../utils/validators/validators";
import { createField, Input, Textarea } from "../../../common/FormsControls/FormsControls";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  // warning: checkbox is required field, but error can not see in form
  return (
    <form className="messages-form" onSubmit={handleSubmit}>
      <div className="profile-person">
        <span className="profile-person__type">Name: </span>
        {createField('Full name', 'fullName', [], Input, {}, 'form-field input')}
      </div>
      <div className="profile-person">
        <span className="profile-person__type">About me: </span>
        {createField('About me', 'aboutMe', [], Textarea, {}, 'form-field input')}
      </div>
      <div className="profile-person profile-person_flexbox"> 
        <span className="profile-person__type">Loking for a job: </span>
        {createField('', 'lookingForAJob', [reqired], Input, { type: 'checkbox' }, '')} 
      </div>
      <div className="profile-person">
        <span className="profile-person__type">My profissional skills: </span>
        {createField('My professional skills', 'lookingForAJobDescription', [], Textarea, {} , 'form-field textarea')}
      </div>
      <div className="profile-person">
        <span className="profile-person__type">Contacts: </span>
        {Object.keys(profile.contacts).map((key) => (
          <div key={key}>
            <span>
              {key}: {createField(key, 'contacts.' + key, [], Input, {}, 'form-field input')}
            </span>
          </div>
        ))}
      </div>
      {error && <span className="form_error">{error}</span>}
      <button className="btn">Save</button>
    </form>
  );
};

const EditProfileDataFormRedux = reduxForm({ form: 'profileDataForm' })(ProfileDataForm);

export default EditProfileDataFormRedux;

