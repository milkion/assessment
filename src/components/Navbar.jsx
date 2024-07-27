import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Just a simple navbar that displays the title.
 * @returns {JSX.Element} The navbar.
 */

function Navbar() {
    return (
        <nav className='bg-gray-900'>
            <div className='container flex justify-between items-center px-4 py-10'>
                <h1 className='text-2xl text-gray-100'>Lizard Global Assessment</h1>
                <ul className='flex justify-end text-base text-gray-100 '>
                    <li className='mr-4'><Link to="/" className='hover:text-gray-300 hover:font-bold'>Home</Link></li>
                    <li><Link to="/details" className='hover:text-gray-300 hover:font-bold'>Details</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;