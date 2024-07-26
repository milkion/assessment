import { useState } from 'react';

function Pagination(data, itemsPerPage) {

  const [currentPage, setCurrentPage] = useState(1);

  const lastIdx = currentPage * itemsPerPage;
  const firstIdx = lastIdx - itemsPerPage;
  const currentData = data.slice(firstIdx, lastIdx);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const numOfPages = [...Array(totalPages + 1).keys()].slice(1);

  return {
    currentPage,
    setCurrentPage,
    currentData,
    numOfPages,
  };
  
}

export default Pagination;