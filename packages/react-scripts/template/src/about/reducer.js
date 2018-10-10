import types from './action';

const initialState = {
  pageView: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_ABOUT_PAGEVIEW:
      return {
        ...state,
        pageView: payload,
      };
    default:
      return state;
  }
};
