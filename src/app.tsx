import React from 'react';
import ReactDOM from 'react-dom';
import {fetchReadingListData, fetchColumnData, BookRecord, Fields} from './api'

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  width: 80vw;
  margin: 0 auto;
`

type AppState = {
  readingList: BookRecord[]
}

export default class App extends React.Component<{}, AppState> {
  
  state = {readingList: []};

  playground = async () => {
    const readingList = await fetchReadingListData();
    this.setState({readingList})
    console.log(readingList)
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