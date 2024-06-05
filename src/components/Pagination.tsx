import React, { FC } from 'react'

interface PaginationProps{
    currentPage: number
    totalItems: number
    itemsPerPage: number
    handlePageChange: (page:number)=>void
}
const Pagination:FC<PaginationProps> = ({currentPage,handlePageChange,itemsPerPage,totalItems}) => {
  return (
    <>
    <div className='flex gap-2'>
        <button
          disabled={currentPage == 1}
          onClick={() => {
            console.log("🚀 ~ currentPage🔥🔥🔥🔥🔥🔥🔥🔥🔥:", currentPage)
            handlePageChange(currentPage - 1)}}
          className='px-2 bg-primaryColor rounded-sm text-white'
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
        </span>
        <button
          disabled={currentPage == Math.ceil(totalItems / itemsPerPage)}
          onClick={() => {
            console.log("🚀 ~ currentPage🔥🔥🔥🔥🔥🔥🔥🔥🔥:", currentPage)
            handlePageChange(currentPage + 1)}}
          className='px-2 bg-primaryColor rounded-sm text-white'
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Pagination
