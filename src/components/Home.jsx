import Navbar from './Navbar';
import CategoryFilter from '../hooks/CategoryFilter';
import Posts from './Posts';
import { useState } from 'react';

function Home() {

    // Manages categories selected by user and passes it into Posts
    const [selectedCategories, setSelectedCategories] = useState([]);

    return (
        <div className='bg-gray-100 flex flex-col min-h-screen'>
          <Navbar />
          <main className='container p-4 mx-auto'>
            <div className='pb-8 pt-4'>
                <CategoryFilter onCategoryChange={setSelectedCategories}/>
            </div>
            <Posts selectedCategories={selectedCategories}/>
          </main>
        </div>
    )
}

export default Home;