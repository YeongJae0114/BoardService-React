import React from "react";
import PostManager from "../post/PostManager"; // PostManager 컴포넌트
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <PostManager /> {/* PostManager 컴포넌트 포함 */}
    </div>
  );
};

export default Home;