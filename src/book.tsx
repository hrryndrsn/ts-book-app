import React from 'react';
import {BookRecord, Fields} from './api';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const BookCard = styled.div`
  padding: 20px;
  background: white;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: color 100ms ease;
  &:hover {
    color: #5352ed;
  }
`
const BookTitle = styled.a`
  text-transform: capitalize;
  font-size: 24px;
  color: #000;
  font-weight: bold;
  margin: 10px 0;
  &:hover {
    color: #5352ed;
    text-decoration: none;
  }
`
const BookAuthor = styled.div`
  font-size: 24px;
  color: rgba(0,0,0, 0.5)
`

const BookCardFooter = styled.div`
  margin-top: 20px;
`


type BookProps = {
  book: BookRecord
  index: number
}


export const Book: React.FunctionComponent<BookProps> = ({book, index}): any => {
  return (
    <Draggable
      draggableId={book.id}
      index={index}
    >
      {(provided, snapshot) => (
          <BookCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <BookTitle href={book.fields.bookUrl}>
              {book.fields.bookTitle}
            </BookTitle>
            <BookCardFooter>
              <BookAuthor>{book.fields.bookAuthor}</BookAuthor>
            </BookCardFooter>
          </BookCard>
        )
      }

    </Draggable>
  )
}