import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../Context/BookContext';
import BookCard from '../Ui/BookCard';

const ListedReadList = ({sortingType}) => {
      const { readList } = useContext(BookContext);
      const [filteredReadList, setFilteredReadList] = useState(readList)

    useEffect(()=>{
        if(sortingType){
            if(sortingType === 'pages'){
                const sortedData = [...readList].sort((a,b)=>a.totalPages - b.totalPages)
                setFilteredReadList(sortedData)
            }
            else if(sortingType === 'rating'){
                const sortedData = [...readList].sort((a,b)=>a.rating - b.rating)
                setFilteredReadList(sortedData)
            }
        }
    }, [sortingType, readList])

      if(readList.length === 0){
        return <div className='h-137.5 bg-gray-100 flex justify-center items-center '>
            <h2 className='font-bold text-3xl'>No readlist data found!</h2>
        </div>
      }

    return (
        
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-'>

            {
                filteredReadList.map((book,ind)=> <BookCard key={ind} book={book}></BookCard>)
            }
            </div>
        </div>
    );
};

export default ListedReadList;