import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import { usePosts } from "../context/PostContext";
const Home = () => {
  //   const [posts, setPosts] = useState([]);
  const { posts, setPosts, deletePost } = usePosts();
  const [editPost, setEditPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  //   useEffect(() => {
  //     const savedLocalPosts = JSON.parse(localStorage.getItem('localPosts')) || [];
  //     const fetchPosts = async () => {
  //       const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  //     //   setPosts(res.data.slice(0, 10)); // Limit for simplicity
  //     setPosts([...savedLocalPosts, ...res.data.slice(0, 10)]);
  // };
  //     fetchPosts();
  //   }, []);

  const handleAddOrEditPost = (post) => {
    if (!post) {
      setEditPost(null);
      return;
    }

    let updatedPosts = [];

    if (post.isLocal) {
      const existing = posts.find((p) => p.id === post.id);
      if (existing) {
        updatedPosts = posts.map((p) =>
          p.id === post.id ? { ...p, ...post } : p
        );
      } else {
        updatedPosts = [post, ...posts];
      }

      const localPosts = updatedPosts.filter((p) => p.isLocal);
      localStorage.setItem("localPosts", JSON.stringify(localPosts));

      setPosts(updatedPosts);
    }

    setEditPost(null);
  };
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4"> Posts</h1>

      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <PostForm onSubmit={handleAddOrEditPost} editPost={editPost} />

      {filteredPosts.length === 0 ? (
        <p className="text-gray-600">No posts found.</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className={`p-4 border rounded shadow-sm hover:bg-gray-50 ${
                post.isLocal ? "flex justify-between" : ""
              }`}
            >
              <Link to={`/post/${post.id}`}>
                <h2 className="text-xl font-semibold line-clamp-1">{post.title}</h2>
                <p className="text-gray-600 truncate">{post.body}</p>
              </Link>
              {post.isLocal && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditPost(post)}
                    className="mt-2 text-sm text-white  px-5 py-3 bg-blue-600 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this post?"
                        )
                      ) {
                        deletePost(post.id);
                      }
                    }}
                    className="mt-2 text-sm text-white  px-5 py-3 bg-red-600 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
