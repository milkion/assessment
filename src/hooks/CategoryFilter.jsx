import { useState, useEffect } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { useSearchParams } from 'react-router-dom';

/**
 * The CategoryFilter hook is in charge of the logic for the category filter. It fetches the categories from the API 
 * and displays them in a dropdown.
 * 
 * @param {Function} onCategoryChange - The function to call when the category changes.
 * @returns {JSX.Element} The dropdown of categories.
 */

function CategoryFilter({onCategoryChange}) {

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    // The reason why i use useEffect is because it will only be rendered once when the component has been mounted,
    // rather than having to fetch the data everytime the component is rendered.
    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {

                // Using set to not have duplicate categories
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

    // This useEffect is used to update the selected categories when the query parameters change. 
    useEffect(() => {
        const categories = searchParams.getAll('categories');
        if (categories) {
            setSelectedCategories(categories.map(category => ({label: category, value: category})));
            console.log("query categories: ", categories);
        }
    }, [searchParams]);


    // This function is called when the user selects a category
    const handleCategoryChange = (selected) => {
        setSelectedCategories(selected);
        onCategoryChange(selected);
        setSearchParams({ categories: selected.map(category => category.value) });
    }

    return (
        <div>
            <p>Filter by category:</p>
            <MultiSelect options = {categories} value={selectedCategories} onChange = {handleCategoryChange} />
        </div>
    );
}

export default CategoryFilter;