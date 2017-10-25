import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';

/*
 * For example,
 *
 * <Router history={history}>
 *   <Route path="/" component={RootFrame}>
 *     <IndexRoute component={App}/>
 *     <Route path="home" component={HomePage}/>
 *     <Route path="about" component={AboutPage}/>
 *   </Route>
 * </Router>
 */
export default function Routes(props) {
  return (
    <Router history={props.history}>
      <Route path="/">
        <IndexRoute component={App}/>
      </Route>
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.object,
};
