import { useState, useEffect } from 'react';
import Pagination from '../hooks/Pagination';

/**
 * The Posts component is in charge of displaying the table fetched from the API.
 * @param {Array} selectedCategories - The categories selected by the user.
 * @returns {JSX.Element} The table of posts.
 */

function Posts({ selectedCategories }) {

  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const APIKey = '/api/posts';
  const postsPerPage = 8;

  //This part fetches the posts from the API
  useEffect(() => {
    fetch(APIKey)
      .then(response => response.json())
      .then(data => setPosts(data.posts))
      .catch(error => console.error('Not able to fetch posts', error));
  }, []);

  //This part filters the posts based on the selected categories
  useEffect(() => {
    if (posts) {
      const filtered = posts.filter((post) =>
        selectedCategories.length === 0 ||
        selectedCategories.every((selectedCategory) =>
          post.categories.some((category) => category.name === selectedCategory.value)
        )
      );
      setFilteredPosts(filtered);
    };
  }, [posts, selectedCategories]);



  // Uses Pagination hook to manage page-related state and data by destructuring the returned object
  const { setCurrentPage, currentData: postsDisplayed, numOfPages } = Pagination(filteredPosts, postsPerPage);

  if (!posts){
    return <div className='flex justify-center'> Loading the good stuff ... </div>;
  }

  return (
    <main>
      <table className='table-fixed border-collapse border border-gray-900'>
        <thead>
          <tr className='border-b border-gray-900 bg-gray-800 text-gray-100'>
            <th className='py-2'>Post ID</th>
            <th>Title</th>
            <th>Published Date</th>
            <th>Author</th>
            <th>Avatar</th>
            <th>Summary</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {postsDisplayed.map((post) => (
            <tr key={post.id} className="border-b border-gray-900">
              <td className='px-4'>{post.id}</td>
              <td className='px-4'>{post.title}</td>
              <td className='px-4'>{new Date(post.publishDate).toLocaleString()}</td>
              <td className='px-4'>{post.author.name}</td>
              <td className='px-4 hover:scale-150 transition-transform duration-300'><img src={post.author.avatar} alt={post.author.name} /></td>
              <td className='px-4'>{post.summary}</td>
              <td className='px-4'>
                <ul className='list-outside list-disc py-2'>
                  {post.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className='flex justify-center items-center py-4'>
        <div className='flex space-x-4'>
          {/* Displaying the pagination buttons */}
          {numOfPages.map((curPage, idx) => (
            <button className='text-gray-900 font-bold p-1 hover:scale-125 transition-transform duration-300' key={idx} onClick={() => setCurrentPage(curPage)}>{curPage}</button>
          ))}
        </div>

      </footer>
    </main>
  );
}

export default Posts;