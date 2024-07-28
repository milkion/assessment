import Navbar from './Navbar';
import CategoryFilter from '../hooks/CategoryFilter';
import Posts from './Posts';
import { useState } from 'react';

/**
 * Home component consists of the home page, which includes the navbar, category filter, and posts table.
 * @returns {JSX.Element}
   */
function Home() {

    // Manages categories selected by user and passes it into Posts
    const [selectedCategories, setSelectedCategories] = useState([]);

    return (
        <div className='bg-gray-100 flex flex-col min-h-screen'>
          <Navbar />
          <main className='container  mx-auto'>
            <div className='pb-8 pt-8'>
                <CategoryFilter onCategoryChange={setSelectedCategories}/>
            </div>
            <div className=''>
                <Posts selectedCategories={selectedCategories}/>
            </div>
          </main>
        </div>
    )
}

export default Home;