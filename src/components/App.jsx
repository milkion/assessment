import { useState } from 'react';
import Posts from './Posts';
import Navbar from './Navbar';
import CategoryFilter from '../hooks/CategoryFilter';

/**
 * The App component is the main component that renders everything.
 * @returns {JSX.Element} The App component.
 */
function App() {

  // Manages categories selected by user and passes it into Posts
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
