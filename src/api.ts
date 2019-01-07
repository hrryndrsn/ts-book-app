// import creds from "./key.json";
import axios from "axios";
import { BookData } from "./newBookForm";

///--------- Types -----------------------------------------

export interface Fields {
  bookTitle: string;
  bookAuthor: string;
  bookUrl: string;
  isReading: boolean;
  audiobook: boolean;
}

export interface BookRecord {
  id: string;
  fields: Fields;
  createdTime: Date;
}

export interface Column {
    bookIds: string[]
    name: string
    order: number
}

///--------- Functions ---------------------------------------


export const emptyColumn = {
      bookIds: [""],
      name: "column-1",
      order: 0,
  }

const ATKey = process.env.REACT_APP_AIRTABLE_API_KEY

//Get all book data
export const fetchReadingListData = async () => {
  let readingList: BookRecord[];
  readingList = [];
  const data =  await axios.get(
      `https://api.airtable.com/v0/appz2wjE9XrYOZ7Lq/reading%20list?api_key=` + ATKey
  )

  let kys = Object.keys(data.data.records);
  let newRecord: BookRecord;

  //interate through the arr of keys
  kys.forEach(element => {
    let record = data.data.records[element];
    newRecord = {
      id: record.id,
      fields: record.fields,
      createdTime: record.createdTime
    };
    //append book records to the reading list
    readingList.push(newRecord);
  });
  return readingList
}

//get data about the current of books
export const fetchColumnData = async () => {
  let colData: Column;
  const resp = await axios.get(
      `https://api.airtable.com/v0/appz2wjE9XrYOZ7Lq/columns?api_key=` + ATKey
  )
  //we are interested in the first column record and just the fields 
  colData = resp.data.records[0].fields
  return colData
}

export const updateColumnData = async (newColFields: Column) => {
  // we only have one col so we have hardcoded the id
  const id = "recM4eSNYiY6cET31";
  const payload = {
    fields: {
      ...newColFields
    }
  }
  const resp = await axios.put(
    `https://api.airtable.com/v0/appz2wjE9XrYOZ7Lq/columns/${id}?api_key=` + ATKey, payload
  )
  return resp.data
}

export const AddBook = async (bookData: BookData) => {
  // we only have one col so we have hardcoded the id
  const colId = "recM4eSNYiY6cET31"
  const {BookTitle, BookAuthor, BookUrl} = bookData
  const payload = {
    fields: {
      bookTitle: BookTitle,
      bookAuthor: BookAuthor,
      bookUrl: BookUrl
    }
  }
  const resp = await axios.post(
    `https://api.airtable.com/v0/appz2wjE9XrYOZ7Lq/reading%20list?api_key=` + ATKey, payload
  )
  console.log(resp.data)
  return resp.data
}

export const UpdateReadingList = async (rl: BookRecord[]) => {
  // we only have one col so we have hardcoded the id
  const id = "recM4eSNYiY6cET31";
  // const payload = {
  //   fields: {
  //     ...rl
  //   }
  // }
  // const resp = await axios.patch(
  //   `https://api.airtable.com/v0/appz2wjE9XrYOZ7Lq/reading%20list/${id}?api_key=` + ATKey, payload
  // )

  // console.log(this)
}