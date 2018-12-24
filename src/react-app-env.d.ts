/// <reference types="react-scripts" />


interface Fields {
  bookTitle: string;
  bookAuthor: string;
  bookUrl: string;
  isReading: boolean;
  audiobook: boolean;
}

interface BookRecord {
  id: string;
  fields: Fields;
  createdTime: Date;
}