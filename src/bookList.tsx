import React  from 'react';
import {BookRecord, Fields} from './api';
import styled from 'styled-components';

import { Book } from './book';

type BookListProps = {
  readingList: BookRecord[] 
}

const Container = styled.div`
  margin: 50px 0;
`

export default class BookList extends React.Component<BookListProps, {}> {
  render() {
    return (
      <Container>
        {
          this.props.readingList.map((book, index) => {
            return (
              <Book key={index} book={book}/>
            )
          })
        }
      </Container>
    )
  }
}