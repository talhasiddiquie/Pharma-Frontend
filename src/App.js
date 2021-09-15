import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import WithTheme from "../src/withTheme";
import configureStore from "./config/Store/index";
import "antd/dist/antd.css";
import { SnackbarProvider } from "notistack";
import SnackTrigger from "./screens/components/SnackTrigger/SnackTriger";

const { persistor, store } = configureStore();
store.dispatch({ type: "SET_BLACK/WHITE_THEME" });

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        {/* <SnackTrigger /> */}
        <PersistGate loading={null} persistor={persistor}>
          {/* App with MUI Theme Provider and Navigations */}
          <WithTheme />
        </PersistGate>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
