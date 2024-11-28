import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header'; // Header.jsx를 import
import Home from './pages/Home';
import PostDetail from "./pages/post/PostDetail"; // 게시글 상세 페이지
import CreatePost from "./pages/CreatePost";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create-post" element={<CreatePost />} /> {/* 게시글 생성 페이지 */}
      </Routes>
    </Router>
  );
};

export default App;
