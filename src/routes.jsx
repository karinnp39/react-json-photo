import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import PhotoTableWrapper from './screen/PhotoTableWrapper';

export default (
  <Route path="/" component={App}>
     <IndexRoute component={PhotoTableWrapper} />
     <Route path="Photos" component={PhotoTableWrapper} />
  </Route>
);