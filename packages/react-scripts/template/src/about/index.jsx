import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPageView } from './action';

class About extends Component {
  componentDidMount() {
    this.props.addPageView();
  }

  render() {
    if (!this.props.pageView) {
      return null;
    }

    return (
      <div className="App-intro">
        <p>This is About page using Redux and Thunk</p>
        <p>({this.props.pageView} time{this.props.pageView > 1 ? 's' : ''} viewed)</p>
      </div>
    );
  }
}

About.propTypes = {
  pageView: PropTypes.number,
  addPageView: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    pageView: state.about.pageView,
  };
}

export default connect(
  mapStateToProps,
  {
    addPageView,
  }
)(About);
