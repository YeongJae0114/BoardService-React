import React from "react";
import { Link } from "react-router-dom"; // React Router Link 사용
import "./PostList.css";

const PostList = ({ posts = [] }) => {
  return (
    <div className="post-list">
      <h2>게시물</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            // key로 고유한 id를 사용
            <li key={post.id} className="post-item">
              <Link to={`/post/${post.id}`} className="post-item__link">
                <h3>{post.title}</h3>
                <div className="post-meta">
                  <span>Author: {post.author || "Anonymous"}</span>
                  <span>
                    Date:{" "}
                    {post.createdDate
                      ? new Date(post.createdDate).toLocaleDateString()
                      : "Unknown"}
                  </span>
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
