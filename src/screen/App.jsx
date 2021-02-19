import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch /* , Link */ } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';

import reduxThunkReducer from '../reducers/reducer';
import './App.css';
import PhotoTableWrapper from './PhotoTableWrapper';

library.add(faSpinner, faSearch);

// Redux
const middlewares = [thunk];
const initialState = {
  items: null,
  itemsPosts: null,
  pending: true,
  error: false,
  pendingPosts: true,
  errorPosts: false,
};
const store = createStore(reduxThunkReducer, initialState, applyMiddleware(...middlewares));

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PhotoTableWrapper} />
    </Switch>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
