import { getAuthUserData } from "./auth-reduser";

const INICIALIZET_SUCCESS = 'INICIALIZET_SUCCESS'; 

let inicialState = {
  inicialized: false
}

const appReduser = (state = inicialState, action) => {
  switch (action.type) {
    case INICIALIZET_SUCCESS: {
      return {
        ...state,
        inicialized: true
      };
    }
    default:
      return state;
  }
};

export default appReduser;

export const initializedSuccess = () => ({ type: INICIALIZET_SUCCESS });

// export const inicializeApp = () => (dispatch) => {
//   let promise = dispatch(getAuthUserData());
//   Promise.all([promise]).then(() => {
//     setTimeout(() => {
//       dispatch(initializedSuccess());
//     }, 1500);
//   });
// }

export const inicializeApp = () => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccess());
};