import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import Routes from './Routes';
import 'normalize.css';
// import 'styles/reset.scss';
import 'styles/main.scss';

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
const history = syncHistoryWithStore(browserHistory, store);
const renderAppContainer = EntryApp => {
  // store를 props로 넘겨받는 이유 (https://github.com/reactjs/react-redux/issues/259)
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <EntryApp history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// ========== 초기화 ==========
document.querySelector('html').setAttribute('ua', navigator.userAgent);

registerServiceWorker();
injectTapEventPlugin(); // onTouchTap 이벤트의 polyfill
renderAppContainer(Routes);

if (module.hot) {
  // HMR AppContainer
  module.hot.accept('./Routes', () => {
    const nextRoutes = require('./Routes').default; // 수정 금지
    renderAppContainer(nextRoutes);
  });
}
