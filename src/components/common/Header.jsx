import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 로그아웃
    navigate("/"); // 홈으로 이동
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">MyBoard</Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <span className="header__username">안녕하세요, {user}님!</span>
              </li>
              <li>
                <button onClick={handleLogout} className="header__logout-button">
                  logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/signup">signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
