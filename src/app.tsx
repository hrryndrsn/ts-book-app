import React from 'react';
import ReactDOM from 'react-dom';
import {fetchReadingListData, fetchColumnData, BookRecord, Fields} from './api'
import BookList from './bookList'
import {DragDropContext} from 'react-beautiful-dnd'

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  width: 80vw;
  margin: 0 auto;
  margin-top: 50px;;
`

const SiteTitle = styled.h1`
`

type AppState = {
  readingList: BookRecord[]
}

export default class App extends React.Component<{}, AppState> {
  
  state = {readingList: []};

  componentDidMount = () => {
    this.loadData()
  }

  loadData = async () => {
    const readingList = await fetchReadingListData();
    this.setState({readingList})
    console.log(readingList)
  }

  onDragEnd = () => {
    //update the state here
  }


  render() {
    return (
      <Container>
        <div>
          <SiteTitle>Reading List 🌀</SiteTitle>
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            <BookList 
              readingList={this.state.readingList}
            />
          </DragDropContext>
        </div>
     </Container>
    )
  }
}