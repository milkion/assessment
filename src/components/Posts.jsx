import { useState, useEffect } from 'react';

function Posts({selectedCategories}) {
    const [posts, setPosts] = useState(null);
    const APIKey = '/api/posts';

    useEffect(() => {
        fetch(APIKey)
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.error('Not able to fetch posts', error));
    }, []);

    if (!posts) {
        return <div>Empty post</div>;
    }

    const filteredPosts = posts.filter((post) =>
        selectedCategories.length === 0 ||
        selectedCategories.every((selectedCategory) =>
          post.categories.some((category) => category.name === selectedCategory.value)
        )
      );


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
                    {filteredPosts.map(post => (
                        <tr>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{new Date(post.publishDate).toLocaleString()}</td>
                            <td>{post.author.name}</td>
                            <td><img src={post.author.avatar} alt = {post.author.name}/></td>
                            <td>{post.summary}</td>
                            <td>
                                <ul>
                                    {post.categories.map(category => (
                                        <li key = {category.id}>{category.name}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Posts;