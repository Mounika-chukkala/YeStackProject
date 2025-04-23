import { useParams, Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";

const PostDetails = () => {
  const { id } = useParams();
  const { posts } = usePosts();

  // Find the post by ID from context (local + API)
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) return <p className="text-center text-red-500">Post not found.</p>;

  return (
    <div className="p-6 max-w-3xl border rounded-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-800 text-lg">{post.body}</p>

      <Link
        to="/"
        className="mt-6 inline-block text-white px-8 py-3 rounded-lg  bg-blue-600 "
      >
         Back to Posts
      </Link>
    </div>
  );
};

export default PostDetails;
