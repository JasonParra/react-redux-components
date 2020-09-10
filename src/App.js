import React, { PureComponent } from "react";
import Home from "./app/screens/home/home";
import Components from "./app/screens/components/components";
import PublicRoute from "./app/components/PublicRoute";
// import ProtectedRoute from "../../components/ProtectedRoute";
import { Switch } from "react-router-dom";

export default class App extends PureComponent {
	render() {
		return (
			<Switch>
				<PublicRoute path={"/components"} component={Components} />
				<PublicRoute path={"/"} component={Home} />
			</Switch>
		);
	}
}
