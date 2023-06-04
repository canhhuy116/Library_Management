import bookService from '@/service/bookService';
import dayjs from 'dayjs';
import { observable, action } from 'mobx';

export interface IBook {
  id: number;
  name: string;
  category: string;
  author: string;
  status: boolean;
  publicCationYear: number;
  publisher: string;
  importDate: dayjs.Dayjs;
}

class BookStore {
  @observable booksData: IBook[] = [];

  @action getAll = async () => {
    try {
      const result = await bookService.getAll();
      this.booksData = result.books;
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  @action createNewBook = async (book: IBook) => {
    try {
      const result = await bookService.createNewBook(book);
      this.booksData.push(result);
    } catch (error) {
      console.error('Error creating new book:', error);
    }
  };
}

export default BookStore;
