import * as React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
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

export default withRouter(Home);
