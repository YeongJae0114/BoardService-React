import React, { createContext, useState, useEffect, useContext } from "react";
import { checkSession } from "../services/api/authService"; // 세션 체크 메소드 호출

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 세션 유효성 확인 함수
  const fetchSession = async () => {
    try {
      const sessionData = await checkSession(); // checkSession API 호출
      setUser(sessionData.user || null); // 세션 데이터에서 사용자 정보 설정
    } catch (error) {
      console.warn("세션이 유효하지 않습니다.");
      setUser(null); // 세션이 유효하지 않으면 사용자 정보 초기화
    } finally {
      setLoading(false); // 로딩 상태 업데이트
    }
  };

  useEffect(() => {
    fetchSession(); // 컴포넌트 마운트 시 세션 유효성 확인
  }, []);

  const login = (userData) => setUser(userData); // 로그인 함수
  const logout = () => setUser(null); // 로그아웃 함수

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
