import React from 'react';
import ReactDOM from 'react-dom';
import {fetchReadingListData, emptyColumn, fetchColumnData, BookRecord, Fields, Column} from './api'
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
  readingList: BookRecord[],
  column: Column
}

export default class App extends React.Component<{}, AppState> {
  
  state = {
    readingList: [], 
    column: emptyColumn
  };

  componentDidMount = () => {
    this.loadData()
  }

  loadData = async () => {
    const readingList = await fetchReadingListData();
    const column = await fetchColumnData();
    
    const filteredBooks: BookRecord[] = this.resolveBookRecords(column.bookIds, readingList)
    this.setState({readingList: filteredBooks, column})
  }

  resolveBookRecords = ( bookIds: string[], readingList: BookRecord[]) => {
    let filteredList: BookRecord[] = []
    //map over the book ids array
    bookIds.map((bookId) => {
      //FOR EACH bookId, find the bookId in the reading list 
      const result = readingList.filter((book) => {
        return book.id === bookId
      })
      filteredList.push(...result);
    })

    return filteredList
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