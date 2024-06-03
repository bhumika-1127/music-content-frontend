import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${window.location.origin}/api/posts`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="post-container"> 
      <h1>Posts</h1>
      {currentPosts.map((post) => (
        <div className="post" key={post.id}> 
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
          <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
            <button onClick={() => paginate(i + 1)}>{i + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
