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
  const { currentPage, setCurrentPage, currentData: postsDisplayed, numOfPages } = Pagination(filteredPosts, postsPerPage);

  return (
    <div className="posts-table">
      <table>
        <thead>
          <tr>
            <th>Post ID</th>
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
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{new Date(post.publishDate).toLocaleString()}</td>
              <td>{post.author.name}</td>
              <td><img src={post.author.avatar} alt={post.author.name} /></td>
              <td>{post.summary}</td>
              <td>
                <ul>
                  {post.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        {/* Displaying the pagination buttons */}
        {numOfPages.map((curPage, idx) => (
          <button key={idx} onClick={() => setCurrentPage(curPage)}>{curPage}</button>
        ))}
      </footer>
    </div>
  );
}

export default Posts;