import React from 'react';

const Post = ({
  post,
  comments,
  newComment,
  handleCommentChange,
  postComment,
  deletePost,
  showUpdateModal,
}) => {
  return (
    <li key={post.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
  <h4 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h4>
  <p className="text-gray-600 mb-4">{post.body}</p>
  <div className="flex items-center mb-4">
    <input
      type="text"
      placeholder="Enter your comment..."
      value={newComment}
      onChange={handleCommentChange}
      className="border border-gray-300 rounded-md py-2 px-4 mr-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={postComment}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
    >
      Create Comment
    </button>
  </div>
  <div className="flex items-center">
    <button
      onClick={deletePost}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-2 transition-colors duration-300"
    >
      Delete
    </button>
    <button
      onClick={showUpdateModal}
      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
    >
      Update
    </button>
  </div>
  <div className="mt-4">
    <h5 className="text-lg font-bold mb-2 text-gray-800">Comments:</h5>
    {comments.length > 0 ? (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 rounded-md p-3 mb-2">
            {comment.body}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No comments yet.</p>
    )}
  </div>
</li>
  );
};

export default Post;