import React from "react";
import { BookRecord, Fields } from "./api";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import { Book } from "./book";

type BookListProps = {
  readingList: BookRecord[];
};

const Container = styled.div`
  margin: 50px 0;
`;

const BookListContainer = styled.div``;

export default class BookList extends React.Component<BookListProps, {}> {
  render() {
    return (
      <Container>
        <Droppable droppableId={"1"}>
          {(provided) => (
              <BookListContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.props.readingList.map((book, index) => {
                  return <Book key={index} book={book} index={index}/>;
                })}
                {provided.placeholder}
              </BookListContainer>
            )
          }
        </Droppable>
      </Container>
    );
  }
}
