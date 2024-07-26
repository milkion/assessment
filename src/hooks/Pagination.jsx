import { useState } from 'react';

/**
 * The Pagination hook is in charge of the logic for the pagination. It takes in the data and the number of items per page
 * and returns the current page, the current data, the number of pages, and the function to set the current page.
 * 
 * @param {Array} data - The data to be paginated.
 * @param {number} itemsPerPage - The number of items per page.
 * @returns {Object} - An object containing pagination state and functions.
 */
function Pagination(data, itemsPerPage) {

  const [currentPage, setCurrentPage] = useState(1); // keeps track of current page

  const lastIdx = currentPage * itemsPerPage; 
  const firstIdx = lastIdx - itemsPerPage;
  const currentData = data.slice(firstIdx, lastIdx); // to display the correct data within the index only
  const totalPages = Math.ceil(data.length / itemsPerPage); 
  const numOfPages = [...Array(totalPages + 1).keys()].slice(1); // removing index 0

  return {
    currentPage,
    setCurrentPage,
    currentData,
    numOfPages,
  };
  
}

export default Pagination;