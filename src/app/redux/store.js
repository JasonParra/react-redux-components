import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { throttle } from "lodash";

function loadState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

function saveState(state) {
  const refactor = {
    ...state,
  };
  try {
    const serializedState = JSON.stringify(refactor);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};


const persistedState = loadState();
const store = createStore(reducer, persistedState, middleware);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store
