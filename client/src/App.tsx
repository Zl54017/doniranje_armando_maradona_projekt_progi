import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import appRouter from "./screens/Routes";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;
