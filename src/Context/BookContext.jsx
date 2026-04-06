import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [readList, setReadList] = useState([]);
  const [wishList, setWishList] = useState([]);

  const handleMarkAsRead = (currentBook) => {
    const isExistBook = readList.find(
      (book) => book.bookId === currentBook.bookId,
    );
        if (isExistBook) {
      toast.error("The book is already exist");
    } else {
      setReadList([...readList, currentBook]);
      toast.success(`${currentBook.bookName} is added to read list`);
    }
  };

  const handleWishList = (currentBook) => {
    
        const isExistInReadList = readList.find(
      (book) => book.bookId === currentBook.bookId,
    );

    if (isExistInReadList) {
      toast.error("This book is already in read list");
      return;
    }

    const isExistBook = wishList.find(
      (book) => book.bookId === currentBook.bookId
    );

    if (isExistBook) {
      toast.error("The book already exist");
    } 
    else{
      setWishList([...wishList, currentBook])
      toast.success(`${currentBook.bookName} is added to list`);
    }
  };

  const data = {
    readList, 
    setReadList, 
    handleMarkAsRead,
    wishList,
    setWishList,
    handleWishList
  };

  return <BookContext.Provider value={data}>{children}</BookContext.Provider>;
};

export default BookProvider;
