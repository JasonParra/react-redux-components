import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";

export default class ProtectedRoute extends PureComponent {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to={"/login"} />;
    }
  }
}
