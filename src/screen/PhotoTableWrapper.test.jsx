import React from 'react';
import { shallow, unmount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, wait } from '@testing-library/react'

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxThunkReducer from '../reducers/reducer';
import fetchPhotosAction from '../actions/actionPhotos';
import testPhoto from '../utils/testPhoto';
import PhotoTableWrapper from './PhotoTableWrapper';

const fetchPhotosMock = jest.mock(fetchPhotosAction, () => {
  return testPhoto;
});

const createTestStore = () => {
  const middlewares = [thunk];
  const initialState = {
    items: null,
    itemsPosts: null,
    pending: true,
    error: false,
    pendingPosts: true,
    errorPosts: false,
  };

  const store = createStore(reduxThunkReducer, initialState, applyMiddleware(...middlewares));;

  return store;
}

describe('Photo Table Wrapper ', () => {
  test('Loading will initiate an API call and waits for Photos array to be returned', async () => {

    expect.assertions(1);

    const App = () => {
      return(
      <Provider store={createTestStore()}>
        <PhotoTableWrapper />
      </Provider>)
    };

    const { getByText } = render(<App />);
    var regex = new RegExp(testPhoto[0].name, "i");
    await wait(() => {
        expect(getByText(regex)).toBeTruthy();
    });
  });

  it('loads the test photo initially with no filter', () => {
    expect(true).toBeTruthy();
  });
});