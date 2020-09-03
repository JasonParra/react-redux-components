import api from "../api";

export const LOG_IN_USER = "LOG_IN_USER";
export const LOG_IN_USER_SUCCESS = "LOG_IN_USER_SUCCESS";
export const LOG_IN_USER_FAIL = "LOG_IN_USER_FAIL";

function requestBegin(type) {
  return { type };
}

function requestSuccess(type, data, message) {
  return { type, payload: { data, message } };
}

function requestFail(type, message) {
  return { type, payload: { message } };
}


export function logInUser(payload) {
  return async dispatch => {
    dispatch(requestBegin(LOG_IN_USER));
    try {
      const objResponse = await api.requestPOST("/user/logIn", payload);
      if (objResponse.data.success) {
        dispatch(requestSuccess(LOG_IN_USER_SUCCESS, objResponse.data.data, objResponse.data.message));
        return objResponse;
      } else {
        dispatch(requestFail(LOG_IN_USER_FAIL, objResponse.data.message));
        return objResponse;
      }
    }
    catch (objError) {
      dispatch(requestFail(LOG_IN_USER_FAIL, objError));
    }
  };
}
