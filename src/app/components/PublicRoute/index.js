import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";

export default class PublicRoute extends PureComponent {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={"/"} />;
    } else {
      return <Route {...this.props} />;
    }
  }
}
