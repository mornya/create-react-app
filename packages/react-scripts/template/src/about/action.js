const types = {
  ADD_ABOUT_PAGEVIEW: 'ADD_ABOUT_PAGEVIEW',
};
export default types;

export function addPageView() {
  return (dispatch, getState) =>
    dispatch({
      type: types.ADD_ABOUT_PAGEVIEW,
      payload: getState().about.pageView + 1,
    });
}
