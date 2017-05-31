import React from 'react';
import { Route } from 'react-router';
// import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';

/*
 * For example,
 *
 * <Route path="/" component={App}>
 *     <IndexRoute component={HomePage}/>
 *     <Route path="home" component={HomePage}/>
 *     <Route path="about" component={AboutPage}/>
 * </Route>
 */
export default <Route path="/" component={App} />;
