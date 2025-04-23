import { useEffect, useState } from 'react';

const PostForm = ({ onSubmit, editPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setBody(editPost.body);
    }
  }, [editPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      id: editPost ? editPost.id : Date.now(),
      title,
      body,
      isLocal: true,
    };

    onSubmit(post);

    if (!editPost) {
      setTitle('');
      setBody('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-transparent p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-3">
        {editPost ? 'Edit Post' : 'Add New Post'}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      ></textarea>
      <div className="flex items-center gap-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editPost ? 'Update Post' : 'Add Post'}
        </button>
        {editPost && (
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className=" text-white py-2 rounded px-8 bg-red-500 "
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
