import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import AppRouter from "./appRoutes/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
