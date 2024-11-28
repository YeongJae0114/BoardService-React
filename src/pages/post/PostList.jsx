import React from "react";
import { Link } from "react-router-dom"; // React Router Link 사용
import "./PostList.css";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      <h2>게시물</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              {/* 상세 페이지로 이동 */}
              <Link to={`/post/${post.id}`} className="post-item__link">
                <h3>{post.title}</h3>
                <div className="post-meta">
                  <span>Author: {post.author}</span>
                  <span>Date: {new Date(post.createdDate).toLocaleDateString()}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
