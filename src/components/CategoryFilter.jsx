import { useState, useEffect } from 'react';
import { MultiSelect } from "react-multi-select-component";

function CategoryFilter() {

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);


    const handleCategoryChange = (event) => {
        setSelectedCategories(event.target.value);
    }

    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {
                
                const uniqueCategories = new Set();

                data.posts.forEach(post => {
                    post.categories.forEach(category => {
                        uniqueCategories.add(category.name);
                    });
                });

                const formatCategories = Array.from(uniqueCategories).map(category => ({label: category, value: category}));
                setCategories(formatCategories);
            })
            .catch(error => console.error('Error fetching data:(', error));
    }, []);



    return (
        <div>
            <p>Filter by category:</p>
            <MultiSelect options = {categories} value={selectedCategories} onChange = {setSelectedCategories} />
        </div>
    );
}

export default CategoryFilter;