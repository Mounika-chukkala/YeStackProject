import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedLocal = JSON.parse(localStorage.getItem('localPosts')) || [];

    const fetchAPI = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const apiPosts = res.data.slice(0, 10);
      setPosts([...savedLocal, ...apiPosts]);
    };

    fetchAPI();
  }, []);
  const deletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('localPosts', JSON.stringify(updatedPosts.filter(p => p.isLocal)));
  };
  return (
    <PostsContext.Provider value={{ posts, setPosts ,deletePost}}>
      {children}
    </PostsContext.Provider>
  );
};
