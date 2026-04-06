import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../Context/BookContext';
import BookCard from '../Ui/BookCard';

const ListedWishList = ({sortingType}) => {
      const { wishList } = useContext(BookContext);
      const [filteredWishList, setFilteredWishList] = useState(wishList)

    useEffect(()=>{
        if(sortingType){
            if(sortingType === 'pages'){
                const sortedData = [...wishList].sort((a,b)=>a.totalPages - b.totalPages)
                setFilteredWishList(sortedData)
            }
            else if(sortingType === 'rating'){
                const sortedData = [...wishList].sort((a,b)=>a.rating - b.rating)
                setFilteredWishList(sortedData)
            }
        }
    }, [sortingType, wishList])




      if(filteredWishList.length === 0){
        return <div className='h-137.5 bg-gray-100 flex justify-center items-center '>
            <h2 className='font-bold text-3xl'>No wishlist data found!

            </h2>
        </div>
      }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-'>

            {
                filteredWishList.map((book,ind)=> <BookCard key={ind} book={book}></BookCard>)
            }
            </div>
        </div>
    );
};

export default ListedWishList;