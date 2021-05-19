import { actions } from './users-reducer';
import { usersReduсer, InitialStateType } from './users-reducer';

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {id: 0, name: 'Irina 0', fullName: 'Kiryanova',  followed: false, photos: {small:null, large: null}, status: 'status 0'},
      {id: 1, name: 'Irina 1', fullName: 'Kiryanova',  followed: false, photos: {small:null, large: null}, status: 'status 1'},
      {id: 2, name: 'Irina 2', fullName: 'Kiryanova',  followed: true, photos: {small:null, large: null}, status: 'status 2'},
      {id: 3, name: 'Irina 3', fullName: 'Kiryanova',  followed: false, photos: {small:null, large: null}, status: 'status 3'},
    ],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
      term: '',
      friend: null as null | boolean
    }
  }
});

test('follow success', () => {
  const newState = usersReduсer(state, actions.followSuccess(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy(); 
});

test('unfollow success', () => {
  const newState = usersReduсer(state, actions.unfollowSuccess(2));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[2].followed).toBeFalsy(); 
});