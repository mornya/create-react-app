import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// To "Code Splitting", be importing React-Router modules by like this.
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import HashRouter from 'react-router-dom/es/HashRouter';

import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import App from './App';
import 'normalize.css';
// import './reset.scss';

const configureStore = initialState => {
  const middlewares = [reduxThunk];

  // Redux devtool 크롬 익스텐션을 사용할 때, applyMiddleware를 createStore의 인자로 넘기면
  // 정상적으로 작동되지 않아 아래와 같이 감싸는 형태로 변경.
  return applyMiddleware(...middlewares)(createStore)(
    reducers,
    initialState || window.__initialState__,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
};
const store = configureStore();
const Router = window.history.pushState ? BrowserRouter : HashRouter;
const renderAppContainer = EntryApp => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <EntryApp />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// ========== 초기화 ==========
const elHTML = document.querySelector('html');
elHTML.setAttribute('ua', navigator.userAgent); // UA string 등록
elHTML.setAttribute('lang', navigator.language); // lang string 등록

registerServiceWorker(); // Service-worker 등록
injectTapEventPlugin(); // onTouchTap 이벤트의 polyfill

// Initialize App
renderAppContainer(App);

// Hot Module Reload
module.hot &&
  module.hot.accept('./App', () =>
    renderAppContainer(require('./App').default)
  );
