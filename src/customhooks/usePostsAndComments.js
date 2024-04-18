import { useState, useCallback } from 'react';

const usePostsAndComments = (userId) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  const fetchUserPosts = useCallback(async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user posts');
      }
      const postData = await response.json();
      setPosts(postData);
      postData.forEach((post) => fetchPostComments(post.id));
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  }, [userId]);

  const fetchPostComments = async (postId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch post comments');
      }
      const commentData = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: commentData,
      }));
    } catch (error) {
      console.error('Error fetching post comments:', error);
    }
  };

  const createPost = async (title, body) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updatePost = async (postId, title, body) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          title,
          body,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
      );
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const postComment = async (postId, comment) => {
    try {
      if (!comment.trim()) {
        console.error('Comment cannot be empty');
        return;
      }

      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          body: comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newCommentData = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), newCommentData],
      }));
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return {
    posts,
    comments,
    fetchUserPosts,
    createPost,
    updatePost,
    deletePost,
    postComment,
  };
};

export default usePostsAndComments;