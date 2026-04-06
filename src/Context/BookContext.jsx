import { createContext, useState } from "react"; 
import { toast } from "react-toastify";
import { addReadListToLoacalDb, getAllReadListFromLocalDB, addWishListToLocalDb, getAllWishListFromLocalDB } from "../utils/localDB";

export const BookContext = createContext(); 

const BookProvider = ({ children }) => {
  const [readList, setReadList] = useState(() => getAllReadListFromLocalDB());
  const [wishList, setWishList] = useState(() => getAllWishListFromLocalDB());

  const handleWishList = (currentBook) => {
    const isExistInReadList = readList.find(book => book.bookId === currentBook.bookId);
    if (isExistInReadList) {
      toast.error("This book is already in read list");
      return;
    }
    const isExistBook = wishList.find(book => book.bookId === currentBook.bookId);
    if (isExistBook) {
      toast.error("The book already exist");
    } else {
      addWishListToLocalDb(currentBook);
      setWishList([...wishList, currentBook]);
      toast.success(`${currentBook.bookName} is added to list`);
    }
  };

  const handleMarkAsRead = (currentBook) => {
    const isExistBook = readList.find(book => book.bookId === currentBook.bookId);
    if (isExistBook) {
      toast.error("The book is already in read list");
    } else {
      addReadListToLoacalDb(currentBook);
      setReadList([...readList, currentBook]);
      toast.success(`${currentBook.bookName} is added to read list`);
    }
  };

  const data = { readList, setReadList, handleMarkAsRead, wishList, setWishList, handleWishList };

  return <BookContext.Provider value={data}>{children}</BookContext.Provider>;
};

export default BookProvider;