import dayjs from 'dayjs';
import { observable, action } from 'mobx';
import { IBook } from './bookStore';
import loanSlipService from '@/service/loanSlipService';

export interface IBooksLoan {
  id: number;
  bookTitle: string;
  borrower: string;
  returnDate: dayjs.Dayjs;
}

export interface ILoanSlip {
  id: number;
  borrowerId: number;
  books: number[];
  borrowDate: dayjs.Dayjs;
}

class LoanSlipStore {
  @observable booksLoan: IBooksLoan[] = [];
  @observable loanSlips: ILoanSlip[] = [];

  @action getAll = async () => {
    try {
      const result = await loanSlipService.getLoanSlips();
      const data: ILoanSlip[] = result.map((item: any) => {
        return {
          id: item.id,
          borrowerId: item.id_card,
          books: item.ids_books,
          borrowDate: dayjs(item.created_at),
        };
      });
      this.loanSlips = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  @action createLoanSlip = async (loanSlip: ILoanSlip) => {
    try {
      const result = await loanSlipService.createLoanSlip(loanSlip);
      this.loanSlips.push(result);
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  @action getBooksLoan = async () => {
    try {
      const result = await loanSlipService.getBooksLoan();
      this.booksLoan = result.booksLoan;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
}

export default LoanSlipStore;
