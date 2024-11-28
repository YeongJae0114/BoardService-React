import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'; // 스타일 파일

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 작성된 데이터를 객체로 생성
    const postData = { title, content, author };

    try {
      const response = await fetch('https://purely-funky-ladybug.ngrok-free.app/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.status}`);
      }

      // 성공 시 게시글 목록으로 이동
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message);
    }
  };

  return (
    <div className="create-post">
      <h1>Create New Post</h1>
      {error && <div className="create-post__error">Error: {error}</div>}
      <form onSubmit={handleSubmit} className="create-post__form">
        <div className="create-post__field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="create-post__field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="create-post__field">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <button type="submit" className="create-post__button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
