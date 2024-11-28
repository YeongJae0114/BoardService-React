import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 사용
import { usePostManager } from "../../hooks/usePostManager";
import PostList from "./PostList";
import "./PostManager.css";

const PostManager = () => {
  const { posts, loading, hasMore, error, loadMorePosts } = usePostManager();
  const navigate = useNavigate(); // useNavigate 훅 추가

  if (error) {
    return <div className="post-manager__error">Error: {error}</div>;
  }

  return (
    <div className="post-manager">
      <div className="post-manager__header">
        {/* GIF 이미지 추가 */}
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjiRCiwt-CsaJ5oZgsOh5xht2VVQvoa3686i_5iLX_srfbKk-p1uPCjDrOaJhVU0k7jbPoLywT4I0CH8UIbWI2iBlXawrumdYoYxbawrKgrKvDlrWklZmKKJdGbWVgqGhpq9o5_XNDk78U/s1600/image.gif"
          alt="Header GIF"
          className="post-manager__gif"
        />
        <h2>타다다다닥탁타닥가각ㄱ다타닥</h2>
      </div>

      {/* 검색 박스 */}
      <div className="post-manager__search">
        <input
          type="text"
          placeholder="Search posts..."
          className="post-manager__search-input"
        />
        <button className="post-manager__search-button">Search</button>
    
        {/* 게시글 생성 버튼 */}
        <button
          className="post-manager__create-button"
          onClick={() => navigate("/create-post")} // 게시글 생성 페이지로 이동
        >
          글 생성
        </button>
      </div>
      <PostList posts={posts} /> {/* 게시글 리스트 */}
      {loading && <div className="post-manager__loading">Loading...</div>} {/* 로딩 중 */}
      {!loading && hasMore && (
        <button onClick={loadMorePosts} className="post-manager__button">
          더 보기
        </button>
      )} {/* 더 보기 버튼 */}
      {!hasMore && <div className="post-manager__no-more">No more posts</div>} {/* 데이터 없음 표시 */}
    </div>
  );
};

export default PostManager;
