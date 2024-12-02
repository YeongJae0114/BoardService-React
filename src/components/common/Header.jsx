import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // AuthContext 사용
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth(); // 로그인 상태 및 로그아웃 함수
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    navigate("/"); // 로그아웃 후 홈으로 이동
  };

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
              {/* 로그인 상태일 때 */}
              <li>
                <span className="header__username">안녕하세요, {user.username}님!</span>
              </li>
              <li>
                <button onClick={handleLogout} className="header__logout-button">
                  logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* 비로그인 상태일 때 */}
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
