import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import { loginUser } from "../../services/api/authService";
import { useAuth } from "../../context/AuthContext"; // AuthContext 사용
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const { login } = useAuth(); // AuthContext에서 login 함수 가져오기

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await loginUser({ email, password }); // API 요청
      console.log("로그인 성공:", response);

      // AuthContext에 사용자 정보 저장
      login(response.user);

      // 로그인 성공 메시지 띄우고 홈 페이지로 이동
      alert("로그인에 성공했습니다!");
      navigate("/"); // Home 페이지로 이동
    } catch (err) {
      // 에러 메시지 처리
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>로그인</h2>
      {error && <p className="error-message">{error}</p>} {/* 에러 메시지 표시 */}
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="이메일을 입력하세요" // 사용자 친화적 placeholder 추가
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
          placeholder="비밀번호를 입력하세요" // 사용자 친화적 placeholder 추가
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
