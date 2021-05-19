import { getAuthUserData } from "./auth-reducer";
import { BaseThunkType, InferActionsType } from "./redux-store"; 

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZET_SUCCESS': {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

export default appReducer;

export const actions = {
  initializedSuccess: () => ({ type: 'INITIALIZET_SUCCESS' } as const),
};

type ThunkType = BaseThunkType<ActionsType>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(actions.initializedSuccess());
};