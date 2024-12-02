import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import { registerUser } from "../../services/api/authService";
import "./SignupForm.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      // API 요청
      await registerUser(username, email, password);
      
      // 회원가입 성공 시 alert 창 표시
      alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");

      // 로그인 페이지로 이동
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2>회원가입</h2>
      {error && <p className="error-message">Error: {error}</p>}
      <div>
        <label htmlFor="username">사용자 이름</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
