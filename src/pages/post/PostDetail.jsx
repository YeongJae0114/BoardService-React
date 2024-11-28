import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostDetail } from "../../hooks/usePostDetail";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트
  const { post, loading, error } = usePostDetail(id); // Custom Hook 사용

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`https://purely-funky-ladybug.ngrok-free.app/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
             "ngrok-skip-browser-warning": "69420"
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete the post.");
        }

        alert("Post deleted successfully!");
        navigate("/"); // 삭제 후 홈으로 이동
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); // 수정 페이지로 이동
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div className="post-meta">
        <span>Author: {post.author}</span>
        <span>Date: {new Date(post.createdDate).toLocaleDateString()}</span>
      </div>
      <div className="post-detail__actions">
        <button className="post-detail__button edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="post-detail__button delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
