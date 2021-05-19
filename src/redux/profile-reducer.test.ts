import profileReducer, {actions} from './profile-reducer';

let state = {
  posts: [
    { id: 1, post: '1 Hello world!!!' },
    { id: 2, post: '2 Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    {
      id: 3,
      post:
        '3 Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque tempore quaerat deleniti eius sed nulla deserunt veniam corrupti ullam odit facilis delectus aperiam error. Perspiciatis necessitatibus cum incidunt.',
    },
    {
      id: 4,
      post:
        '4 Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque.',
    },
  ],
  profile: null,
  isProfile: false ,
  status: '',
};

it ('length of new post should be 5', () => {
  let action = actions.addNewPost('samurai')
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
  let action = actions.addNewPost('samurai');
  let newState = profileReducer(state, action);
  expect(newState.posts[4].post).toBe('samurai');
});

it('after deleting length of posts should be decrement', () => {
  let action = actions.deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
});

it('after deleting length of posts should not be decrement if id is incorrect', () => {
  let action = actions.deletePost(6);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
});