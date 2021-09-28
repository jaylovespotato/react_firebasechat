
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import Reducer from './redux/reducers';
import thunk from 'redux-thunk';


import 'bootstrap/dist/css/bootstrap.min.css';



const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <Router >
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
