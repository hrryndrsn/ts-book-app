import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

const FormCard = styled.div`
  padding: 20px;
  background: white;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 20px;
`

const FormGroup = styled.form`
  display: grid;
  gap: 20px;
`

const NewBookInput = styled.input`
  font-size: 24px;
  color: #000;
  outline: none;
  border: none;
  height: 30px;
  transition: border 500ms ease;
  border-bottom: #fff 2px solid;
  &:focus {
    border-bottom: #2ed573 2px solid;
  }
`

const CardFooter = styled.div`
  display:flex;
  justify-content: flex-end;
`
const AddButton = styled.button`
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
const CancelButton = styled.button`
 height: 40px;
 width: 100px;
 border: none;
 color: rgba(0,0,0, 0.5);
 outline: none;
 font-weight: bold;
 font-size: 16px;
`

type NewBookFormProps = {
  cancel: () => void 
  addNewBook: (data: BookData) => void
}

type NewBookFormState = {
  BookTitle: string,
  BookAuthor: string,
  BookUrl: string
}

export interface BookData {
  BookTitle: string,
  BookAuthor: string,
  BookUrl: string
}

export class NewBookForm extends React.Component<
  NewBookFormProps, 
  NewBookFormState
> {
  state = {
    BookTitle: "",
    BookAuthor: "",
    BookUrl: "",
  }

  handleSubmitForm = (event: SyntheticEvent) => {
    event.preventDefault();
    let data: BookData = {
      BookTitle: this.state.BookTitle,
      BookAuthor: this.state.BookAuthor,
      BookUrl: this.state.BookUrl
    };
    this.props.addNewBook(data);
    this.setState({
      BookTitle: "",
      BookAuthor: "",
      BookUrl: "",
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.id) {
      case "title":
        this.setState({ BookTitle: event.target.value})
        break
      case "author":
        this.setState({ BookAuthor: event.target.value})
        break
      case "url":
        this.setState({ BookUrl: event.target.value})
      break
    }
  }
  
  render() {
    return (
        <FormCard>
          <FormGroup onSubmit={this.handleSubmitForm}>
          <NewBookInput
            id="title"
            placeholder="Title..."
            autoFocus={true}
            className="bookTitleInput"
            onChange={this.handleInputChange}
            required
          />
          <NewBookInput
            id="author"
            placeholder="Author(s)..."
            onChange={this.handleInputChange}
            required
          />
          <NewBookInput
            id="url"
            className="linkInput"
            placeholder="URL..."
            // type="url"
            onChange={this.handleInputChange}
            required
          />
          <CardFooter>
            <CancelButton
              onClick={this.props.cancel}
            >Cancel</CancelButton>
            <AddButton
              type="submit"
            >Add</AddButton>
          </CardFooter>
          </FormGroup>
        </FormCard>
    )
  }
}