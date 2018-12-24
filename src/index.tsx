import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import {fetchData, BookRecord, Fields} from './api'

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  width: 80vw;
  margin: 0 auto;
`

class App extends React.Component {
  playground = () => {
    fetchData();
  }
  render() {
    return (
      <Container>
        <div>
          <h1>Zordie</h1>
          <button onClick={this.playground}>start</button>
        </div>
     </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
