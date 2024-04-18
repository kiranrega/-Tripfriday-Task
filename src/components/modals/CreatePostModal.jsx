import React from 'react';
import Modal from 'react-modal';
import useFormInput from '../../customhooks/useFormInput';

Modal.setAppElement('#root');

const CreatePostModal = ({ isOpen, onRequestClose, createPost }) => {
  const { value: newPostTitle, handleChange: handlePostTitleChange, resetValue: resetPostTitle } = useFormInput('');
  const { value: newPostBody, handleChange: handlePostBodyChange, resetValue: resetPostBody } = useFormInput('');

  const handleCreatePost = () => {
    createPost(newPostTitle, newPostBody);
    resetPostTitle();
    resetPostBody();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Post Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Create Post</h3>
        <input
          type="text"
          placeholder="Enter post title"
          value={newPostTitle}
          onChange={handlePostTitleChange}
          className="border border-gray-300 rounded-md py-2 px-4 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Enter post body"
          value={newPostBody}
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
            onClick={handleCreatePost}
          >
            Create Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;