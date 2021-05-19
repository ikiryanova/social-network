import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import {createField, GetStringKeys, Textarea} from '../../common/FormsControls/FormsControls';
import Post from './Post/Post';
import { PostType } from '../../../types/types';
import { reqired, maxLengthCreator } from '../../../utils/validators/validators';

import './myPosts.css';

export type MapPropsType = {
  posts: Array<PostType>,
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};

const maxLength = maxLengthCreator(100);

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = ({ posts, addPost }) => {
  const addNewPost = (value: AddPostFormValuesType) => {
    addPost(value.newPostText);
  };

  return (
    <div>
      <h2>My posts:</h2>
      <AddPostFormRedux onSubmit={addNewPost} />
      {[...posts].reverse().map((post) => (
        <Post postItem={post.post} key={post.id} />
      ))}
    </div>
  );
};

export default MyPosts;

type PropsType = {}

type AddPostFormValuesType = {
  newPostText: string
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (
  props
) => {
  return (
    <form onSubmit={props.handleSubmit} className="posts">
      {createField<AddPostFormValuesTypeKeys>(
        'Input post',
        'newPostText',
        [reqired, maxLength],
        Textarea,
        {},
        'posts__textarea'
      )}
      {/* <Field
        component={Textarea}
        placeholder={'Input post'}
        name={'newPostText'}
        className="posts__textarea"
        validate={[reqired, maxLength]}
      /> */}
      <button className="btn posts-btn">Add post</button>
    </form>
  );
};

const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({ form: 'profileAddPostForm' })(AddPostForm);
