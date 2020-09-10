import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";

export default class PublicRoute extends PureComponent {
	render() {
		const { isLoggedIn } = this.props;

		if (isLoggedIn) {
			const storedRoute = localStorage.getItem("route");
			if (storedRoute) {
				const parsedProps = JSON.parse(storedRoute);
				return <Redirect to={parsedProps.path} />;
			} else {
				return <Redirect to={"/"} />;
			}
		} else {
			return <Route {...this.props} />;
		}
	}
}
