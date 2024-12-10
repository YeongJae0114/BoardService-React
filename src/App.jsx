import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from "./context/AuthContext"; // AuthContext 추가
import Header from './components/common/Header'; // Header.jsx를 import
import Home from './pages/home/Home';
import PostDetail from "./pages/post/PostDetail"; // 게시글 상세 페이지
import CreatePost from "./pages/createPost/CreatePost";
import LoginForm from './pages/login/LoginForm';
import SignupForm from './pages/login/SignupForm';

const App = () => {
  return (
<AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} /> {/* 로그인 페이지 */}
          <Route path="/signup" element={<SignupForm />} /> {/* 회원가입 페이지 */}
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create-post" element={<CreatePost />} /> {/* 게시글 생성 페이지 */}
        </Routes>
      </Router>
  </AuthProvider>
  );
};

export default App;
