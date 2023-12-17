import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={appStore}>
      {/*suppose if we had to use the data of the appStore in certain components only, then we would have wrapped it there, since we are assuming that the entire app might need it we are wrapping it all under it */}
      <App />
    </Provider>
  </BrowserRouter>
);
