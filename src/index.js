import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './app/redux/store'

// Initialize the desired locales.
import "./index.css";

import App from "./App";

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider >,
  document.getElementById("root")
);





