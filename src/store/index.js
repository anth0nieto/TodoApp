import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers';

const MODE = 'prod';
let middleware;
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 4000,
  whitelist: ['Auth'],
};

if (MODE === 'dev') {
  console.log('Redux mode -> ', MODE);
  middleware = composeWithDevTools(
    applyMiddleware(promise, thunk, createLogger()),
  );
} else {
  console.log('Redux mode -> ', MODE);
  middleware = applyMiddleware(promise, thunk);
}

const persistedReducer =
  rootReducer && persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);
export {store, persistor};
