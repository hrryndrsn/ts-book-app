import creds from "./key.json";
import axios from "axios";

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

///--------- Functions ---------------------------------------

export const fetchData = async () => {
  let readingList: BookRecord[];
  readingList = [];

  const data =  await axios.get(
      `https://api.airtable.com/v0/appz2wjE9XrYOZ7Lq/reading%20list?api_key=` + creds.key
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
  //print out the new reading list
  console.log(readingList);
  
}