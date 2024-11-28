import React, { useState } from "react";
import { createPost } from "../../services/api/postService"; // 게시글 생성 API 호출
import "./PostForm.css";

const PostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState(""); // 제목 입력 상태
  const [content, setContent] = useState(""); // 내용 입력 상태
  const [error, setError] = useState(null); // 에러 상태

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      await createPost({ title, content }); // API 호출로 게시글 생성
      setTitle(""); // 입력 필드 초기화
      setContent("");
      onPostAdded(); // 부모 컴포넌트에 새 게시글 추가 알림
    } catch (err) {
      setError("Failed to create a post. Please try again."); // 에러 처리
      console.error(err);
    }
  };

  return (
    <div className="post-form">
      <h2>Create a New Post</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
