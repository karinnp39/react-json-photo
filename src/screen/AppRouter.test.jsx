import * as React from "react";
import { MemoryRouter as Router } from "react-router-dom";

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxThunkReducer from '../reducers/reducer';

import { render } from "@testing-library/react";
import { Routes } from "./App";

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

const renderWithRouter = (children, initialEntries = ["/"]) => {
  return render(<Provider store={store}>
    <Router initialEntries={initialEntries}>{children}</Router></Provider>);
};

describe("App router for Photo pages", () => {
  it("render Photos at '/'", () => {
    const route = ["/"];
    const page = renderWithRouter(<Routes />, route);
    page.getByText("Photos");
  });
});
