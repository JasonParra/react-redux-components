import React from "react";
import { render } from "react-dom";

//Router
import { BrowserRouter } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./app/redux/store";

//Components
import App from "./App";

//Styles
// import "react-table-6/react-table.css";
import "./index.css";

render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
