import { InjectedFormProps, reduxForm } from "redux-form";

import { createField, GetStringKeys, Input, Textarea } from "../../../common/FormsControls/FormsControls";
import { ProfileType } from "../../../../types/types";
import { reqired } from "../../../../utils/validators/validators";

type PropsType = {
  profile: ProfileType
}

type ProfileTypesKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
  handleSubmit,
  profile,
  error
}) => {
  // warning: checkbox is required field, but error can not see in form
  return (
    <form className="messages-form" onSubmit={handleSubmit}>
      <div className="profile-person">
        <span className="profile-person__type">Name: </span>
        {createField<ProfileTypesKeys>('Full name', 'fullName', [], Input, {}, 'form-field input')}
      </div>
      <div className="profile-person">
        <span className="profile-person__type">About me: </span>
        {createField<ProfileTypesKeys>('About me', 'aboutMe', [], Textarea, {}, 'form-field input')}
      </div>
      <div className="profile-person profile-person_flexbox">
        <span className="profile-person__type">Loking for a job: </span>
        {createField<ProfileTypesKeys>('', 'lookingForAJob', [reqired], Input, { type: 'checkbox' }, '')}
      </div>
      <div className="profile-person">
        <span className="profile-person__type">My profissional skills: </span>
        {createField<ProfileTypesKeys>(
          'My professional skills',
          'lookingForAJobDescription',
          [],
          Textarea,
          {},
          'form-field textarea'
        )}
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

const EditProfileDataFormRedux = reduxForm<ProfileType, PropsType>({ form: 'profileDataForm' })(ProfileDataForm);

export default EditProfileDataFormRedux;

