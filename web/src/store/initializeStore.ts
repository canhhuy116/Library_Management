import BookStore from '@/store/bookStore';
import ReportStore from './reportStore';

export default function initializeStores() {
  return {
    bookStore: new BookStore(),
    reportStore: new ReportStore(),
  };
}
