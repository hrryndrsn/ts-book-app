import React from 'react';
import ReactDOM from 'react-dom';
import {fetchReadingListData, emptyColumn, fetchColumnData, BookRecord, Column, updateColumnData} from './api'
import BookList from './bookList'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

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
    document.title = " 🌀 Reading list";
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

  onDragEnd = (result: DropResult) => {
    const {destination, source, draggableId} = result;
    console.log(result)
    if (!destination) {
      //the draggable was dropped outside a vaalid droppable
      return
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) { // the user has dropped the draggable in the same position
        return;
      }

    const column: Column = this.state.column;
    //copy rather than mutate the state
    //must also specify the type of array to avoid never[]
    const newBookIds: string[] = Array.from(column.bookIds); 
    //more the book position in the array
    newBookIds.splice(source.index, 1);
    newBookIds.splice(destination.index, 0, draggableId);

    const newColumn: Column = {
      bookIds: newBookIds,
      name: this.state.column.name,
      order: this.state.column.order
    };
    
    //regenerate the filtered readingList here
    const newSortedReadingList = this.resolveBookRecords(newColumn.bookIds, this.state.readingList)

    // update the state
    this.setState({
      readingList: newSortedReadingList,
      column: newColumn
    })

    //create a async function to manage the update
    const updateTable = async (column: Column) => {
      const result = await updateColumnData(column)
      console.log(result)
    }
    updateTable(newColumn);
  };

  render() {
    return (
      <Container>
        <div>
          <SiteTitle>📚 Reading List</SiteTitle>
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