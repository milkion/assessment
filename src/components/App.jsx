import { useState } from 'react';
import Posts from './Posts';
import Navbar from './Navbar';
import CategoryFilter from '../hooks/CategoryFilter';

function App() {

  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div>
      <Navbar />
      <CategoryFilter onCategoryChange={setSelectedCategories}/>
      <Posts selectedCategories={selectedCategories}/>
    </div>
  );
}

export default App;
