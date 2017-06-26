import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import routes from './routes';
import 'normalize.css';
// import './reset.scss';
import './index.scss';

document.querySelector('html').setAttribute('ua', navigator.userAgent);

const configureStore = initialState => {
  const middlewares = [reduxThunk];
  // Redux devtool 크롬 익스텐션을 사용할 때, applyMiddleware를 createStore의 인자로 넘기면
  // 정상적으로 작동되지 않아 아래와 같이 감싸는 형태로 변경.
  const store = applyMiddleware(...middlewares)(createStore)(
    reducers,
    initialState || window.__initialState__,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  // HMR Store
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const renderAppContainer = () => {
  // store를 props로 넘겨받는 이유 (https://github.com/reactjs/react-redux/issues/259)
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

registerServiceWorker();
injectTapEventPlugin(); // onTouchTap 이벤트의 polyfill
renderAppContainer();

if (module.hot) {
  // HMR AppContainer
  module.hot.accept(renderAppContainer);
}
