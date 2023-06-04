import BookStore from '@/store/bookStore';

export default function initializeStores() {
  return {
    bookStore: new BookStore(),
  };
}
