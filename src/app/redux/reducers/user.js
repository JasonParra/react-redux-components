import {

  LOG_IN_USER,
  LOG_IN_USER_SUCCESS,
  LOG_IN_USER_FAIL,

} from "../actions/user";


export default function models(
  state = {
    userLogged: null,
    isFetching: false,
    message: [],
    error: false
  },
  action
) {

  const { payload, type } = action;
  let message;
  switch (type) {

    case LOG_IN_USER:
      return { ...state, isFetching: true, error: false };
    case LOG_IN_USER_SUCCESS:
      message = [].concat(payload.message)
      return {
        ...state,
        isFetching: false,
        userLogged: payload.data,
        error: false,
        message
      };
    case LOG_IN_USER_FAIL:
      message = [].concat(payload.message)
      return { ...state, isFetching: false, error: true, message };

    default:
      return state;
  }
}
