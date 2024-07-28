import React from 'react';
import Navbar from './Navbar';

function Details() {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className='flex justify-center items-center h-[90vh]'>
        <h1 className='text-2xl'>Oops, it's empty here</h1>
      </div>
    </div>
  );
}

export default Details;