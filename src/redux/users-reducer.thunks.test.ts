import { ResultCodeEmun } from './../api/api';
import { APIResponseType } from '../api/api';
import { usersAPI } from './../api/users-api';
import { actions, follow } from './users-reducer';

jest.mock('./../api/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
  resultCode: ResultCodeEmun.Success,
  messages: [],
  data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

test('success follow thunk', async () => {
  const thunk = follow(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleIsFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleIsFollowingProgress(false, 1));
});