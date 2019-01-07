import React from 'react';
import ReactDOM from 'react-dom';
import {fetchReadingListData, emptyColumn, fetchColumnData, BookRecord, Column, updateColumnData, AddBook} from './api'
import BookList from './bookList'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {NewBookForm, BookData} from './newBookForm'

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  width: 80vw;
  margin: 0 auto;
  margin-top: 50px;;
`

const SiteTitleGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const AddBookButton = styled.button`
 height: 40px;
 width: 100px;
 border: none;
 background: #2ed573;
 color: #fff;
 outline: none;
 box-shadow: 0px 2px 0px rgba(0,0,0, 0.2);
 border-radius: 5px;
 font-weight: bold;
 font-size: 16px;
 &:active {
   background: #16B556;
   box-shadow: none;
 }
 &:hover {
   background: #16B556;
 }
`

const SiteTitle = styled.h1`
`

type AppState = {
  readingList: BookRecord[],
  column: Column,
  newBookFormActive: boolean
}

export default class App extends React.Component<{}, AppState> {
  
  state = {
    readingList: [],
    column: emptyColumn,
    newBookFormActive: false
  };

  componentDidMount = () => {
    document.title = "Reading list";
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

  toggleNewBookForm = () => {
    const flip = !this.state.newBookFormActive
    this.setState({newBookFormActive: flip})
  }

  handleAddNewBook = (data: BookData) => {
    // console.log(data)
    //add new book to the reading list via api
    AddBook(data)
      .then((book: BookRecord) => {
        console.log('book to add->',book)
        const newColumn: Column = {
          bookIds: [...this.state.column.bookIds, book.id],
          name: this.state.column.name,
          order: this.state.column.order
        };

        const newRL = [...this.state.readingList, book]
        const resolvedRL = this.resolveBookRecords(newColumn.bookIds, newRL)
        // console.log(newColumn, "new Col ->")
        updateColumnData(newColumn)
        .then((data: any) => {
          console.log('data->', data)
        })

        this.setState({
          readingList: resolvedRL, 
          column: newColumn,
          newBookFormActive: false
        })
      })
  }

  render() {
    return (
      <Container>
          <SiteTitleGroup>
            <SiteTitle>📚 Reading List</SiteTitle>
            { //conditionally render the add book button
              !this.state.newBookFormActive && 
              <AddBookButton
                onClick={this.toggleNewBookForm}
              >
               Add book
              </AddBookButton>
            }
          </SiteTitleGroup>
          { //conditionally render the add book form
            this.state.newBookFormActive && 
              <NewBookForm 
                cancel={this.toggleNewBookForm}
                addNewBook={this.handleAddNewBook}
              />
          }
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            <BookList 
              readingList={this.state.readingList}
            />
          </DragDropContext>
     </Container>
    )
  }
}