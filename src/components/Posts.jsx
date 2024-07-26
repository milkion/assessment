import { useState, useEffect } from 'react';
import Pagination from '../hooks/Pagination';

function Posts({ selectedCategories }) {

  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const APIKey = '/api/posts';
  const postsPerPage = 8;

  useEffect(() => {
    fetch(APIKey)
      .then(response => response.json())
      .then(data => setPosts(data.posts))
      .catch(error => console.error('Not able to fetch posts', error));
  }, []);

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

  const { currentPage, setCurrentPage, currentData: postsDisplayed, numOfPages } = Pagination(filteredPosts, postsPerPage);

  return (
    <div className="posts table">
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
        {numOfPages.map((curPage, idx) => (
          <button key={idx} onClick={() => setCurrentPage(curPage)}>{curPage}</button>
        ))}
      </footer>
    </div>
  );
}

export default Posts;