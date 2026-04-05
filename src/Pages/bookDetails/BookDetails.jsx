
import { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { BookContext } from "../../Context/BookContext";

// const booksPromise = fetch('.booksData.json').then((res) => res.json());

const BookDetails = () => {
  const { bookId: bookParamsId } = useParams(); //link e jei id jabe shetai params e boshbe

  // const books = use(booksPromise)

  const books = useLoaderData();
  const expectedBook = books.find((book) => book.bookId === Number(bookParamsId)); //params e type string kintu data.json e number tai == or type conversion lagbe
  const {bookId, bookName, author, image, review, totalPages, rating, category, tag, publisher, yearOfPublishing} = expectedBook

  const {handleMarkAsRead, storedBooks} = useContext(BookContext)



  return (
    <div className="grid grid-cols-2 bg-base-100 shadow-sm container mx-auto my-98">
      <figure className="w-full flex items-center justify-center bg-gray-100 rounded-xl">
        <img
          src={image}
          alt={bookName}
          className="h-100 w-ful"
        />
      </figure>
      <div className="card-body space-y-3">
        <h2 className="card-title text-2xl">{bookName}</h2>
        <h2 className="card-title">By: {author}</h2>
        <p className="py-2 border-y">{category}</p>
        <p>{review}</p>
                <div className="flex items-center gap-2">
                  {expectedBook.tags.map((tag,ind) => (
                    <div key={ind} className="badge text-green-500 bg-green-100 font-bold">
                      {tag}
                    </div>
                  ))}
                </div>
        <div className="border-t space-y-3">
            <div className="flex justify-between items-center gap-2">
                <p>Number of pages:</p> <p>{totalPages}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
                <p>Publisher:</p> <p>{publisher}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
                <p>Publish time:</p> <p>{yearOfPublishing}</p>
            </div>
            <div className="flex items-center gap-2">
          <button onClick={()=> handleMarkAsRead(expectedBook)} className="btn">Mark as read</button>
          <button className="btn btn-primary">Add to wishlist</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
