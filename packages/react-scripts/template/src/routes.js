import React from 'react';
import { Router, Route } from 'react-router';
// import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';

/*
 * For example,
 *
 * <Router history={history}>
 *   <Route path="/" component={App}>
 *     <IndexRoute component={HomePage}/>
 *     <Route path="home" component={HomePage}/>
 *     <Route path="about" component={AboutPage}/>
 *   </Route>
 * </Router>
 */
export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
};
