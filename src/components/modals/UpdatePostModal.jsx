import React from 'react';
import Modal from 'react-modal';
import useFormInput from '../../customhooks/useFormInput';

Modal.setAppElement('#root');

const UpdatePostModal = ({ isOpen, onRequestClose, editingPostId, posts, updatePost }) => {
  const postToEdit = posts.find((post) => post.id === editingPostId);

  const { value: updatedPostTitle, handleChange: handlePostTitleChange, resetValue: resetPostTitle } = useFormInput(
    postToEdit?.title || ''
  );
  const { value: updatedPostBody, handleChange: handlePostBodyChange, resetValue: resetPostBody } = useFormInput(
    postToEdit?.body || ''
  );

  const handleUpdatePost = () => {
    updatePost(editingPostId, updatedPostTitle, updatedPostBody);
    resetPostTitle();
    resetPostBody();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Post Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Update Post</h3>
        <input
          type="text"
          placeholder="Enter post title"
          value={updatedPostTitle}
          onChange={handlePostTitleChange}
          className="border border-gray-300 rounded-md py-2 px-4 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Enter post body"
          value={updatedPostBody}
          onChange={handlePostBodyChange}
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpdatePost}
          >
            Update Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePostModal;