import React, { useState, useEffect, useCallback } from "react";
import { useUserId } from "./userContext";
import { useParams } from "react-router-dom";
import CreatePostModal from "./modals/CreatePostModal";
import UpdatePostModal from "./modals/UpdatePostModal";
import usePostsAndComments from "../customhooks/usePostsAndComments";
import useFormInput from "../customhooks/useFormInput";
import Post from "./Post";
import ReactPaginate from "react-paginate";

const UserPosts = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { userId } = useParams();
  const { userId: contextUserId } = useUserId();

  const postsPerPage = 2;

  const {
    posts,
    comments,
    fetchUserPosts,
    createPost,
    updatePost,
    deletePost,
    postComment,
  } = usePostsAndComments(userId || contextUserId);

  const {
    value: newComment,
    handleChange: handleCommentChange,
    resetValue: resetNewComment,
  } = useFormInput("");

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleShowCreateModal = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setShowCreateModal(false);
    resetNewComment();
  }, [resetNewComment]);

  const handleShowUpdateModal = useCallback((postId) => {
    setShowUpdateModal(true);
    setEditingPostId(postId);
  }, []);

  const handleCloseUpdateModal = useCallback(() => {
    setShowUpdateModal(false);
    setEditingPostId(null);
  }, []);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={() => setShowPosts(!showPosts)}
      >
        <h2 className="text-xl font-bold text-gray-800">
          {showPosts ? "Hide Posts" : "Show Posts"}
        </h2>
        <span
          className={`transform transition-transform ${
            showPosts ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {showPosts && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4 text-gray-800">User Posts</h3>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md py-2 px-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex mb-4">
            <button
              onClick={handleShowCreateModal}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            >
              Create Post
            </button>
          </div>
          <ul className="grid gap-4">
            {currentPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                comments={comments[post.id] || []}
                newComment={newComment}
                handleCommentChange={handleCommentChange}
                postComment={() => postComment(post.id, newComment, resetNewComment)}
                deletePost={() => deletePost(post.id)}
                showUpdateModal={() => handleShowUpdateModal(post.id)}
              />
            ))}
          </ul>
          <div className="mt-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
              onPageChange={handlePageChange}
              containerClassName={"flex justify-center"}
              activeClassName={"bg-blue-500 text-white"}
              previousClassName={"mr-2"}
              nextClassName={"ml-2"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
              pageClassName={
                "px-3 py-1 border border-gray-300 hover:bg-gray-200 cursor-pointer"
              }
            />
          </div>
        </div>
      )}
      <CreatePostModal
        isOpen={showCreateModal}
        onRequestClose={handleCloseCreateModal}
        createPost={createPost}
      />
      <UpdatePostModal
        isOpen={showUpdateModal}
        onRequestClose={handleCloseUpdateModal}
        editingPostId={editingPostId}
        posts={posts}
        updatePost={updatePost}
      />
    </div>
  );
};

export default UserPosts;
