import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <>
        <p className="App-intro">
          This is just Home page.
        </p>
        <button onClick={this.props.history.goBack}>Back</button>
        <p>&nbsp;</p>
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Home);
