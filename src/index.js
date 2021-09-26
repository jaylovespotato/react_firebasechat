import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {promiseMiddleware} from 'redux-promise';
import {ReduxThunk} from 'redux-thunk';
import Reducer from './redux/reducers';


// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)


ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
