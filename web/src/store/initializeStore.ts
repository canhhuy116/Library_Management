import BookStore from '@/store/bookStore';
import ReportStore from './reportStore';
import LoanSlipStore from './loanSlipStore';

export default function initializeStores() {
  return {
    bookStore: new BookStore(),
    reportStore: new ReportStore(),
    loanSlipStore: new LoanSlipStore(),
  };
}
