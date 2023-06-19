import { IBook } from '@/store/bookStore';

class BookService {
  public async getAll(): Promise<any> {
    const response = await fetch('../src/service/books.json');
    const data = await response.json();
    return data;
  }

  public async createNewBook(book: IBook): Promise<any> {
    const response = await fetch('../src/service/books.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    const data = await response.json();
    return data;
  }
}

export default new BookService();
