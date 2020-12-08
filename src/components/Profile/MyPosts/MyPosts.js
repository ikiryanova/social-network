import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { reqired, maxLengthCreator } from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';
import './myPosts.css';
import Post from './Post/Post';

const maxLength = maxLengthCreator(100);

const MyPosts = ({ posts, addPost }) => {
  const addNewPost = (value) => {
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

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="posts">
      <Field
        component={Textarea}
        placeholder={'Input post'}
        name={'newPostText'}
        className="posts__textarea"
        validate={[reqired, maxLength]}
      />
      <button className="btn posts-btn">Add post</button>
    </form>
  );
};

const AddPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm);
