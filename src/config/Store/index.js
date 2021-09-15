import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducers from "./Reducers/index";
// import logger from 'redux-logger'
// import { CookieStorage } from 'redux-persist-cookie-storage'
// import Cookies from 'cookies-js'
const persistConfig = {
  key: "root",
  storage,
  // storage: new CookieStorage(Cookies)
};

const reducer = persistReducer(persistConfig, reducers);
export default function configureStore() {
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      global.devToolsExtension ? global.devToolsExtension() : (f) => f
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
}
