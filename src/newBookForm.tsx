import React from 'react';
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
const NewBookInput = styled.input`
  font-size: 24px;
  color: #000;
  outline: none;
  border: none;
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

export default class NewBookForm extends React.Component<{}, {}> {
  render() {
    return (
        <FormCard>
          <NewBookInput
            placeholder="Title..."
            autoFocus={true}
            className="bookTitleInput"
          />
          <NewBookInput
            placeholder="Author(s)..."
          />
          <NewBookInput
            className="linkInput"
            placeholder="URL..."
          />
          <CardFooter>
            <CancelButton>Cancel</CancelButton>
            <AddButton>Add</AddButton>
          </CardFooter>
        </FormCard>
    )
  }
}